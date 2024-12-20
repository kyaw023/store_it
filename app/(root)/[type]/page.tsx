import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.action";
import { getFileTypesParams } from "@/lib/utils";

import { Models } from "node-appwrite";
import React from "react";

const page = async ({ searchParams, params }: SearchParamProps) => {
  const type = (await params).type as string;

  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "$createdAt-desc";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({
    types,
    sort,
    searchText,
  });

  return (
    <div className="page-container">
      <section className="w-full flex items-center justify-between">
        <div>
          <h1 className="h1 capitalize">{type}</h1>
          <p className="body-1">
            Total Size: <span className="h5">10GB</span>
          </p>
        </div>

        <div className="totol-size-section ">
          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

      {/* Render the files */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default page;
