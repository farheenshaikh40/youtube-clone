import React, { useState } from "react";
import { VideoComment } from "../Types";
import { BiLike, BiDislike } from "react-icons/bi";
export default function Comment({ data }: { data: VideoComment }) {
  const isCommentLengthy = data.textDisplay.length > 200;
  const [showMore, setShowMore] = useState(!isCommentLengthy);

  return (
    <div className="flex gap-5 mr-5 mt-4 items-start">
      <div>
        <img
          src={data.authorProfileImageUrl}
          alt=""
          className="rounded-full h-10 w-10"
        />
      </div>
      <div className="w-5/6">
        <strong className="mr-2">{data.authorDisplayName}</strong>
        <span className="text-gray-400 text-sm">{data.updatedAt} ago</span>
        <div
          className={` comments-list text-sm ${
            !showMore ? "max-h-16 overflow-hidden truncate" : ""
          } text-sm w-11/12`}
          dangerouslySetInnerHTML={{ __html: data.textDisplay }}
        ></div>
        {isCommentLengthy && (
          <div>
            <button
              className="text-gray-400 text-sm cursor-pointer"
              onClick={() => setShowMore(!showMore)}
            >
              Read {showMore ? "less" : "more"}
            </button>
          </div>
        )}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-1">
            <BiLike />
            {data.likeCount}
          </div>
          <div className="flex items-center gap-1">
            <BiDislike />
            0
          </div>
        </div>
      </div>
    </div>
  );
}
