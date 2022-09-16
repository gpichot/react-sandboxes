import React from "react";
import { faker } from "@faker-js/faker";
import { useInfiniteQuery } from "react-query";

import styles from "./styles.module.css";

type PostPage = {
  nextPage: number | null;
  previousPage: number | null;
  posts: { id: number; title: string }[];
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchPosts = async ({ pageParam = 0 }): Promise<PostPage> => {
  await sleep(Math.random() * 3000);
  faker.seed(pageParam);
  return {
    nextPage: pageParam - 1,
    previousPage: pageParam + 1,
    posts: [
      {
        id: pageParam * 100 + 1,
        title: faker.science.chemicalElement().name,
      },
      {
        id: pageParam * 100 + 2,
        title: faker.science.chemicalElement().name,
      },
      {
        id: pageParam * 100 + 3,
        title: faker.science.chemicalElement().name,
      },
    ],
  };
};

/**
 * Post Skeleton using inline style
 */
function PostSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "20px",
        margin: "4px 0",
      }}
    >
      <div className={styles["loading"]} />
    </div>
  );
}

export default function App() {
  const query = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.previousPage,
  });
  return (
    <div style={{ margin: 10 }}>
      {query.isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : query.isError ? (
        <div>Error</div>
      ) : (
        <>
          {query.hasPreviousPage && (
            <button
              onClick={() => query.fetchPreviousPage()}
              disabled={query.isFetchingPreviousPage}
            >
              Previous
            </button>
          )}
          {query.isFetchingPreviousPage && (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
          {(query.data?.pages || []).map((pages) => (
            <div key={pages.nextPage}>
              {pages.posts.map((post) => (
                <div key={post.id}>{post.title}</div>
              ))}
            </div>
          ))}
          {query.isFetchingNextPage && (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
          {query.hasNextPage && (
            <button
              onClick={() => query.fetchNextPage()}
              disabled={query.isFetchingNextPage}
            >
              Next
            </button>
          )}
        </>
      )}
    </div>
  );
}
