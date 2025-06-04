import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

import { toast } from 'react-toastify';

const KgPageComponent: React.FC = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] });

  useEffect(() => {
    fetch(`${API_BASE_URL}/neo4j/claim/from-graph/8f14e45f-ea8c-4a18-9143-dc9b3ea3df62`)
      .then(res => res.json())
      .then(data => {
        const nodes: any[] = [];
        const links: any[] = [];

        const claimNode = {
          id: data.claim.claim_id,
          label: "Claim",
          name: data.claim.claim,
          group: "claim"
        };
        nodes.push(claimNode);

        // Add Entity Nodes and Links
        data.entities.forEach((e: any, i: number) => {
          const entityId = `${e.name}-${i}`;
          nodes.push({
            id: entityId,
            label: e.type,
            name: e.name,
            group: "entity"
          });
          links.push({
            source: claimNode.id,
            target: entityId,
            label: "MENTIONS"
          });
        });

        // Add Article Nodes and Links
        data.semantic_results.forEach((a: any, i: number) => {
          const articleId = `article-${a.pmid}`;
          nodes.push({
            id: articleId,
            label: "Article",
            name: a.title,
            group: "article"
          });
          links.push({
            source: claimNode.id,
            target: articleId,
            label: "EVIDENCED_BY"
          });

          // Authors
          a.authors.forEach((author: string, idx: number) => {
            const authorId = `author-${author}-${idx}`;
            nodes.push({
              id: authorId,
              label: "Author",
              name: author,
              group: "author"
            });
            links.push({
              source: articleId,
              target: authorId,
              label: "AUTHORED_BY"
            });
          });
        });

        setGraphData({ nodes, links });
      });
  }, []);

   const handleClick = () => {
    // Trigger a success toast
    toast.success("Data saved successfully!");

    // Trigger an error toast
    // toast.error("Something went wrong!");
  };
 
  return (
    <>
      <div>
        <p>Hello World</p>

        <button 
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-200">
            Save
        </button>
      </div>

       <div className="p-4 bg-white shadow-md rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Knowledge Graph</h2>
          <div className="h-[600px] w-full border rounded-xl overflow-hidden">
            <ForceGraph2D
              graphData={graphData}
              nodeLabel="name"
              nodeAutoColorBy="group"
              linkLabel="label"
            />
          </div>
        </div>

    </>
   
  );
};

export default KgPageComponent;
