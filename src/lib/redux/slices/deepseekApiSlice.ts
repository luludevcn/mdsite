import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 定义 API 返回类型
interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// 定义请求参数类型
interface DeepSeekRequest {
  model: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

// 创建 API Slice
export const deepseekApiSlice = createApi({
  reducerPath: 'deepseekApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.deepseek.com/v1',
    prepareHeaders: (headers) => {
      const apiKey = localStorage.getItem('deepseek_api_key') || process.env.DEEPSEEK_API_KEY;
      if (apiKey) {
        headers.set('Authorization', `Bearer ${apiKey}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    generateText: builder.mutation<DeepSeekResponse, DeepSeekRequest>({
      query: (body) => ({
        url: '/chat/completions',
        method: 'POST',
        body,
      }),
    }),
    generateDocument: builder.mutation<DeepSeekResponse, Omit<DeepSeekRequest, 'model'> & {
      document_type: 'pdf' | 'word' | 'ppt' | 'ebook' | 'resume';
      template?: string;
    }>({
      query: (body) => ({
        url: '/documents/generate',
        method: 'POST',
        body: {
          model: 'deepseek-doc',
          ...body,
        },
      }),
    }),
  }),
});

export const { 
  useGenerateTextMutation, 
  useGenerateDocumentMutation 
} = deepseekApiSlice;