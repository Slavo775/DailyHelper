import type { RendererElement, RendererNode, Component, VNode } from "vue";

export type RenderIcon = (
  icon: Component
) => () => VNode<RendererNode, RendererElement, { [key: string]: any }>;
