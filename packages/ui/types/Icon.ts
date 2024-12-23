import type { RendererElement, RendererNode, Component, VNode } from 'vue'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type RenderIcon = (
  icon: Component
) => () => VNode<RendererNode, RendererElement, { [key: string]: any }>
