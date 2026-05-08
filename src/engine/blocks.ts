export type BlockShape = number[][];

export interface Block {
  id: string;
  shape: BlockShape;
}

export const BLOCK_DICTIONARY: Block[] = [
  // 1x1
  { id: '1x1', shape: [[1]] },
  
  // 2x2
  { id: '2x2', shape: [[1, 1], [1, 1]] },
  
  // 3x3
  { id: '3x3', shape: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] },
  
  // Horizontal lines
  { id: 'line_h2', shape: [[1, 1]] },
  { id: 'line_h3', shape: [[1, 1, 1]] },
  { id: 'line_h4', shape: [[1, 1, 1, 1]] },
  { id: 'line_h5', shape: [[1, 1, 1, 1, 1]] },
  
  // Vertical lines
  { id: 'line_v2', shape: [[1], [1]] },
  { id: 'line_v3', shape: [[1], [1], [1]] },
  { id: 'line_v4', shape: [[1], [1], [1], [1]] },
  { id: 'line_v5', shape: [[1], [1], [1], [1], [1]] },
  
  // L-shapes (small)
  { id: 'l_small_1', shape: [[1, 0], [1, 1]] },
  { id: 'l_small_2', shape: [[0, 1], [1, 1]] },
  { id: 'l_small_3', shape: [[1, 1], [1, 0]] },
  { id: 'l_small_4', shape: [[1, 1], [0, 1]] },
  
  // L-shapes (large 3x3)
  { id: 'l_large_1', shape: [[1, 0, 0], [1, 0, 0], [1, 1, 1]] },
  { id: 'l_large_2', shape: [[0, 0, 1], [0, 0, 1], [1, 1, 1]] },
  { id: 'l_large_3', shape: [[1, 1, 1], [1, 0, 0], [1, 0, 0]] },
  { id: 'l_large_4', shape: [[1, 1, 1], [0, 0, 1], [0, 0, 1]] },
  
  // T-shapes
  { id: 't_shape_1', shape: [[1, 1, 1], [0, 1, 0]] },
  { id: 't_shape_2', shape: [[0, 1, 0], [1, 1, 1]] },
  { id: 't_shape_3', shape: [[1, 0], [1, 1], [1, 0]] },
  { id: 't_shape_4', shape: [[0, 1], [1, 1], [0, 1]] },
];

export function getRandomBlocks(count: number = 3): Block[] {
  const result: Block[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * BLOCK_DICTIONARY.length);
    result.push(BLOCK_DICTIONARY[randomIndex]);
  }
  return result;
}
