const map = require("crocks/pointfree/map");
const psi = require("crocks/combinators/psi");
const filter = require("crocks/pointfree/filter");
const converge = require("crocks/combinators/converge");
const { includes, curry, compose, toUpper, flatten, equals, and, any, tap } = require("ramda");

/**
 * Adjecency Matrix
 * 
 * VxV 0-1 matrix. A[i,j] => i and j are connected.
 * Values in the matrix can also be different from
 * 1 and 0, and would then represent the weights
 * between the respective edges in a weighted graph.
 */

const vertices = ["A", "B", "C", "D", "E"];
const edges = [
  ["A", "B"],
  ["A", "D"],
  ["B", "C"],
  ["C", "D"],
  ["C", "E"],
  ["D", "E"],
];

type TNode = string;

// Find adjecent nodes
type IsNe = (a: TNode) => (b: TNode) => boolean;
const isNe: IsNe = a => b => a !== b;

type FindAdj = (node: TNode) => (edges: TNode[][]) => TNode[];
const findAdjecentNodes: FindAdj = node =>
  compose(filter(isNe(node)), flatten, filter(includes(node)));

console.log(findAdjecentNodes("A")(edges));

// Given two nodes - are they connected?
const I = (a: any) => a;
type IsConn = (a: TNode) => (b: TNode) => (edges: TNode[][]) => boolean;
const isConnected: IsConn = a => b =>
  compose(any(I), map(converge(and, includes(a), includes(b))));

console.log(isConnected("A")("B")(edges));

/**
 * Adjecency List
 * 
 * Array of linked lists.
 */
