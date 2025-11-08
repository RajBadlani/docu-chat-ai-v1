import "dotenv/config"
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { JinaEmbeddings } from "@langchain/community/embeddings/jina";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

function cleanText(text: string) {
  return text
    .replace(/\s+/g, " ") 
    .replace(/\n/g, " ") 
    .trim(); 
}
interface FileProps {
  pdfUrl: string;
  pdfName: string;
  pdfId: string;
  userId: string;
}
export async function ingestion({pdfUrl,pdfName,pdfId,userId}: FileProps) {

  try {
    
    if (!process.env.PINECONE_API_KEY || !process.env.JINA_EMBEDDING_API_KEY)
      throw new Error("Missing Pinecone or Jina credentials");
    if (!process.env.PINECONE_INDEX_NAME)
      throw new Error("Missing Pinecone Index Name");

    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const loader = new WebPDFLoader(blob, { splitPages: true });
    const docs = await loader.load();
    console.log(`Documents loaded`);
     
    const numPages = docs.length;
    const totalLength = docs.reduce(
      (acc, doc) => acc + doc.pageContent.length,
      0
    );
    const avgLength = totalLength / numPages;

    let chunkSize, chunkOverlap;

    if (avgLength < 1500) {
      
      chunkSize = 1200;
      chunkOverlap = 150;
    } else if (avgLength < 3000) {
      
      chunkSize = 1000;
      chunkOverlap = 200;
    } else {
      
      chunkSize = 800;
      chunkOverlap = 300;
    }

    
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });
    console.log(`Splitting Done`);

    
    const splitDocs = await splitter.splitDocuments(docs);
    const cleanedDocs = splitDocs.map((doc) => ({
      ...doc,
      pageContent: cleanText(doc.pageContent),
      metadata: {
        ...doc.metadata,
        pdfName,
        pdfId,
        userId,
      },
    }));

    
    console.log(`Chunks get cleaned`);

    
    const pinecone = new Pinecone({
      apiKey:process.env.PINECONE_API_KEY,
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    const embeddings = new JinaEmbeddings({
      apiKey : process.env.JINA_EMBEDDING_API_KEY,
      model: "jina-embeddings-v3",
    });

    await PineconeStore.fromDocuments(cleanedDocs, embeddings, {
      pineconeIndex: index,
      namespace: userId,
    });
    console.log(`Storing ${cleanedDocs.length} chunks in Pinecone...`);

    console.log(`Successfully embeddings get stored`);

    return { success: true ,  status: 201 };
  } catch (error) {
    console.log(`Error occured ${error}`);
    return { success: false, status: 500 };
  }
}