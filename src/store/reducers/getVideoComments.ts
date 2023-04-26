import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawViewstoString, timeSince } from "../../utils";

import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getVideoComments = createAsyncThunk(
  "yotubeApp/videoComments",
  async (id: string) => {
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/commentThreads?key=${API_KEY}&part=snippet&videoId=${id}`
    );

    return parseData(items);
  }
);

const parseData = (items: []) => {
  const mappedData = items.map((item) => {
    const {
      id,
      snippet: {
        topLevelComment: {
          snippet: {
            textDisplay,
            authorDisplayName,
            updatedAt,
            authorProfileImageUrl,
            authorChannelUrl,
            likeCount,
            authorChannelId: { value },
          },
        },
      },
    } = item;
    return {
      id,
      textDisplay,
      likeCount,
      authorDisplayName,
      updatedAt: timeSince(new Date(updatedAt)),
      authorProfileImageUrl,
      authorChannelUrl,
      authorChannelId: { value, },
    };
  });

  return mappedData;
};
