import { JinaEmbeddings } from "@langchain/community/embeddings/jina";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

interface SearchProps {
  query: string;
  userId: string;
  pdfId: string;
  topK?: number;
}

export async function similaritySearch({
  query,
  userId,
  pdfId,
  topK = 5,
}: SearchProps) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  const embeddings = new JinaEmbeddings({
    apiKey: process.env.JINA_EMBEDDING_API_KEY!,
    model: "jina-embeddings-v3",
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace: userId,
  });
  const filter = { pdfId };
  const result = await vectorStore.similaritySearch(query, topK, filter);
  return result;
}
