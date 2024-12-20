import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail type={file.type} extension={file.extension} url={file.url} />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  );
};

export const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex ">
      <p className="file-details-label text-left">{label}</p>
      <p className="file-details-value text-left">{value}</p>
    </div>
  );
};

export const FileDetail = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-2 px-2 pt-2">
        <DetailRow label="Format" value={file.extension} />
        <DetailRow label="Size" value={convertFileSize(file.size)} />
        <DetailRow label="Owner" value={file.owner.fullName} />
        <DetailRow
          label="Last Modified : "
          value={formatDateTime(file.$updatedAt)}
        />
      </div>
    </>
  );
};

interface ShareInputProps {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({
  file,
  onInputChange,
  onRemove,
}: ShareInputProps) => {
  return (
    <div>
      <ImageThumbnail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-center">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Email address"
          onChange={(e) =>
            onInputChange(
              e.target.value.split(",").map((email) => email.trim())
            )
          }
          className="share-input-field"
        />
      </div>
      <div className="pt-4">
        <div className="flex justify-between">
          <p className="subtitle-2 text-light-100">Shared with</p>{" "}
          <p className="subtitle-2 text-light-200">
            {file.shared.length} users
          </p>
        </div>
        <ul className="pt-2">
          {file.users.map((email: string) => (
            <li
              className="flex items-center justify-between space-x-2"
              key={email}
            >
              <p className="subtitle-2">{email}</p>
              <Button
                className="share-remove-user"
                onClick={() => onRemove(email)}
              >
                <Image
                  src="/assets/icons/remove.svg"
                  alt="remove"
                  width={24}
                  height={24}
                  className="remove-icon"
                />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
