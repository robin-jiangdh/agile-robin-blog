import type { Metadata } from "next";

export const metadata: Metadata = { title: "关于" };

export default function About() {
  return (
    <div className="container-narrow">
      <div className="page-head">
        <h1>关于</h1>
        <p>关于这个博客，和写博客的人。</p>
      </div>
      <div className="md-body">
        <h2>目前专注的</h2>
        <ul>
          <li>AI 与软件工程的交叉地带：AI Coding、Agent 工作流、MLOps</li>
          <li>DevOps 与可观测性：从指标、日志、追踪到数据可观测性</li>
          <li>Home Lab 折腾：自建服务、监控、自动化</li>
        </ul>
        <h2>这个博客</h2>
        <p>
          「Agile Robin」之前跑在 Hashnode 上，2026 年 9 月迁移到自建站（Next.js +
          Vercel），内容全部用 Markdown 管理，推代码即发布。
        </p>
        <p>固定栏目：</p>
        <ul>
          <li>
            <strong>周六《开源周报》</strong>—— GitHub 开源项目动态复刊
          </li>
          <li>
            <strong>周三《硬核深挖》</strong>—— 第一季 DataOps：把数据管道当软件一样交付
          </li>
          <li>
            <strong>月末《工具生态盘点》</strong>—— 横评对比，给人群画像不给唯一答案
          </li>
        </ul>
        <h2>我认为</h2>
        <ul>
          <li>正常情况下，源码能够暴露 coder 的思维缺陷，但缺陷不一定是坏事儿</li>
          <li>有效的测试能一定程度上发现缺陷</li>
        </ul>
        <h2>我反对的</h2>
        <ul>
          <li>
            <strong>反对一切未经思考的编程实践</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
