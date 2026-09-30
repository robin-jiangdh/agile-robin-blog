"use client";

import Giscus from "@giscus/react";

const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO || "";
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "";
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "";
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "";

export function Comments() {
  if (!REPO || !REPO_ID || !CATEGORY_ID) return null;
  return (
    <div style={{ marginTop: 40 }}>
      <Giscus
        repo={REPO as `${string}/${string}`}
        repoId={REPO_ID}
        category={CATEGORY || "General"}
        categoryId={CATEGORY_ID}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="zh-CN"
      />
    </div>
  );
}
