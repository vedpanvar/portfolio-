import React, { useState, useCallback } from 'react';
import { RotateCcw, FlipVertical, ExternalLink, Trophy, Cpu } from 'lucide-react';

type PieceColor = 'w' | 'b';
type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';

interface Piece {
  type: PieceType;
  color: PieceColor;
}

type BoardState = (Piece | null)[][];

const PIECE_UNICODE: Record<string, string> = {
  wp: '♙',
  wr: '♖',
  wn: '♘',
  wb: '♗',
  wq: '♕',
  wk: '♔',
  bp: '♟',
  br: '♜',
  bn: '♞',
  bb: '♝',
  bq: '♛',
  bk: '♚'
};

const PIECE_VALUES: Record<PieceType, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0
};

function createInitialBoard(): BoardState {
  const backRank: PieceType[] = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
  const board: BoardState = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  for (let c = 0; c < 8; c++) {
    board[0][c] = { type: backRank[c], color: 'b' };
    board[1][c] = { type: 'p', color: 'b' };
    board[6][c] = { type: 'p', color: 'w' };
    board[7][c] = { type: backRank[c], color: 'w' };
  }
  return board;
}

function createSicilianBoard(): BoardState {
  const b = createInitialBoard();
  // 1. e4 c5 2. Nf3 d6
  b[4][4] = b[6][4];
  b[6][4] = null;
  b[3][2] = b[1][2];
  b[1][2] = null;
  b[5][5] = b[7][6];
  b[7][6] = null;
  b[2][3] = b[1][3];
  b[1][3] = null;
  return b;
}

export const InteractiveChessPreview: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [board, setBoard] = useState<BoardState>(() => createInitialBoard());
  const [turn, setTurn] = useState<PieceColor>('w');
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [autoReply, setAutoReply] = useState(true);
  const [moveHistory, setMoveHistory] = useState<string[]>(['Game ready on playchessx.online engine']);
  const [lastMove, setLastMove] = useState<{ from: [number, number]; to: [number, number] } | null>(null);

  const getValidMoves = useCallback((b: BoardState, r: number, c: number): [number, number][] => {
    const piece = b[r][c];
    if (!piece) return [];
    const moves: [number, number][] = [];
    const inBounds = (row: number, col: number) => row >= 0 && row < 8 && col >= 0 && col < 8;

    if (piece.type === 'p') {
      const dir = piece.color === 'w' ? -1 : 1;
      const startRow = piece.color === 'w' ? 6 : 1;
      if (inBounds(r + dir, c) && !b[r + dir][c]) {
        moves.push([r + dir, c]);
        if (r === startRow && inBounds(r + dir * 2, c) && !b[r + dir * 2][c]) {
          moves.push([r + dir * 2, c]);
        }
      }
      for (const dc of [-1, 1]) {
        if (inBounds(r + dir, c + dc) && b[r + dir][c + dc] && b[r + dir][c + dc]?.color !== piece.color) {
          moves.push([r + dir, c + dc]);
        }
      }
    } else if (piece.type === 'n') {
      const jumps = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      for (const [dr, dc] of jumps) {
        const nr = r + dr;
        const nc = c + dc;
        if (inBounds(nr, nc) && (!b[nr][nc] || b[nr][nc]?.color !== piece.color)) {
          moves.push([nr, nc]);
        }
      }
    } else if (piece.type === 'k') {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (inBounds(nr, nc) && (!b[nr][nc] || b[nr][nc]?.color !== piece.color)) {
            moves.push([nr, nc]);
          }
        }
      }
    } else {
      const dirs: [number, number][] = [];
      if (piece.type === 'r' || piece.type === 'q') {
        dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);
      }
      if (piece.type === 'b' || piece.type === 'q') {
        dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
      }
      for (const [dr, dc] of dirs) {
        let nr = r + dr;
        let nc = c + dc;
        while (inBounds(nr, nc)) {
          if (!b[nr][nc]) {
            moves.push([nr, nc]);
          } else {
            if (b[nr][nc]?.color !== piece.color) moves.push([nr, nc]);
            break;
          }
          nr += dr;
          nc += dc;
        }
      }
    }
    return moves;
  }, []);

  const validTargets = selected ? getValidMoves(board, selected[0], selected[1]) : [];

  const toAlgebraic = (piece: Piece, fromR: number, fromC: number, toR: number, toC: number, captured: Piece | null) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const pChar = piece.type === 'p' ? (captured ? files[fromC] : '') : piece.type.toUpperCase();
    const cap = captured ? 'x' : '';
    return `${pChar}${cap}${files[toC]}${8 - toR}`;
  };

  const makeBotMove = useCallback(
    (currentBoard: BoardState) => {
      const allBlackMoves: { from: [number, number]; to: [number, number]; score: number }[] = [];
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (currentBoard[r][c]?.color === 'b') {
            const targets = getValidMoves(currentBoard, r, c);
            for (const [tr, tc] of targets) {
              const targetPiece = currentBoard[tr][tc];
              const captureScore = targetPiece ? PIECE_VALUES[targetPiece.type] * 10 : 0;
              const centerBonus = (tr === 3 || tr === 4) && (tc >= 2 && tc <= 5) ? 2 : 0;
              allBlackMoves.push({
                from: [r, c],
                to: [tr, tc],
                score: captureScore + centerBonus + Math.random()
              });
            }
          }
        }
      }
      if (allBlackMoves.length === 0) return;
      allBlackMoves.sort((a, b) => b.score - a.score);
      const chosen = allBlackMoves[0];
      const movingPiece = currentBoard[chosen.from[0]][chosen.from[1]]!;
      const capturedPiece = currentBoard[chosen.to[0]][chosen.to[1]];

      const next = currentBoard.map(row => [...row]);
      const promotedType: PieceType = movingPiece.type === 'p' && chosen.to[0] === 7 ? 'q' : movingPiece.type;
      next[chosen.to[0]][chosen.to[1]] = { type: promotedType, color: 'b' };
      next[chosen.from[0]][chosen.from[1]] = null;

      const notation = toAlgebraic(movingPiece, chosen.from[0], chosen.from[1], chosen.to[0], chosen.to[1], capturedPiece);
      setBoard(next);
      setLastMove({ from: chosen.from, to: chosen.to });
      setTurn('w');
      setMoveHistory(prev => [...prev.slice(-11), `Black: ${notation}`]);
    },
    [getValidMoves]
  );

  const handleSquareClick = (r: number, c: number) => {
    const clickedPiece = board[r][c];

    if (selected) {
      const [sr, sc] = selected;
      if (sr === r && sc === c) {
        setSelected(null);
        return;
      }

      const isTarget = validTargets.some(([tr, tc]) => tr === r && tc === c);
      if (isTarget) {
        const movingPiece = board[sr][sc]!;
        const capturedPiece = board[r][c];
        const next = board.map(row => [...row]);
        const promotedType: PieceType =
          movingPiece.type === 'p' && (r === 0 || r === 7) ? 'q' : movingPiece.type;

        next[r][c] = { type: promotedType, color: movingPiece.color };
        next[sr][sc] = null;

        const notation = toAlgebraic(movingPiece, sr, sc, r, c, capturedPiece);
        setBoard(next);
        setSelected(null);
        setLastMove({ from: [sr, sc], to: [r, c] });

        const nextTurn: PieceColor = turn === 'w' ? 'b' : 'w';
        setTurn(nextTurn);
        setMoveHistory(prev => [
          ...prev.slice(-11),
          `${movingPiece.color === 'w' ? 'White' : 'Black'}: ${notation}`
        ]);

        if (autoReply && nextTurn === 'b') {
          setTimeout(() => {
            makeBotMove(next);
          }, 260);
        }
        return;
      }
    }

    if (clickedPiece && clickedPiece.color === turn) {
      setSelected([r, c]);
    } else {
      setSelected(null);
    }
  };

  const resetBoard = () => {
    setBoard(createInitialBoard());
    setTurn('w');
    setSelected(null);
    setLastMove(null);
    setMoveHistory(['New standard game started']);
  };

  const loadSicilian = () => {
    setBoard(createSicilianBoard());
    setTurn('w');
    setSelected(null);
    setLastMove({ from: [1, 3], to: [2, 3] });
    setMoveHistory(['1. e4 c5', '2. Nf3 d6 — Sicilian Defense loaded']);
  };

  // Calculate material score
  let whiteScore = 0;
  let blackScore = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p) {
        if (p.color === 'w') whiteScore += PIECE_VALUES[p.type];
        else blackScore += PIECE_VALUES[p.type];
      }
    }
  }
  const diff = whiteScore - blackScore;

  const displayRows = flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
  const displayCols = flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="rounded-xl border border-white/10 bg-[#121216] p-4 sm:p-5">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-mono">
            <span>playchessx.online</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Engine Preview</span>
          </div>
          <h4 className="text-base font-semibold text-[#FAFAFA] mt-0.5">
            {turn === 'w' ? 'White to Move' : 'Black to Move'}
            {diff !== 0 && (
              <span className="ml-2 text-xs font-mono text-[#A78BFA]">
                ({diff > 0 ? `+${diff} White` : `+${Math.abs(diff)} Black`})
              </span>
            )}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoReply(prev => !prev)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              autoReply
                ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/50 text-[#FAFAFA]'
                : 'bg-[#1A1A22] border-white/10 text-[#A1A1AA] hover:text-[#FAFAFA]'
            }`}
            title="Toggle automatic Black response"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{autoReply ? 'Bot: On' : '2-Player'}</span>
          </button>

          <button
            type="button"
            onClick={() => setFlipped(f => !f)}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#1A1A22] border border-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            title="Flip board perspective"
          >
            <FlipVertical className="w-3.5 h-3.5" />
            <span>Flip</span>
          </button>

          <button
            type="button"
            onClick={resetBoard}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#1A1A22] border border-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            title="Reset chessboard"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Board + Move Log Grid */}
      <div className={`grid gap-5 ${compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12 items-start'}`}>
        <div className={`${compact ? 'max-w-[320px] mx-auto w-full' : 'lg:col-span-7 max-w-[380px] mx-auto w-full'}`}>
          <div
            className="grid grid-cols-8 aspect-square rounded-lg overflow-hidden border border-white/15 select-none"
            role="grid"
            aria-label="Interactive Chessboard from playchessx.online"
          >
            {displayRows.map(r =>
              displayCols.map(c => {
                const isDark = (r + c) % 2 === 1;
                const piece = board[r][c];
                const isSelected = selected?.[0] === r && selected?.[1] === c;
                const isTarget = validTargets.some(([tr, tc]) => tr === r && tc === c);
                const isLastMove =
                  (lastMove?.from[0] === r && lastMove?.from[1] === c) ||
                  (lastMove?.to[0] === r && lastMove?.to[1] === c);

                let squareBg = isDark ? 'bg-[#1E1E2A]' : 'bg-[#2E2E3E]';
                if (isSelected) {
                  squareBg = 'bg-[#8B5CF6]/60';
                } else if (isLastMove) {
                  squareBg = isDark ? 'bg-[#06B6D4]/25' : 'bg-[#06B6D4]/35';
                }

                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    onClick={() => handleSquareClick(r, c)}
                    className={`relative flex items-center justify-center aspect-square text-2xl sm:text-3xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${squareBg}`}
                    aria-label={`Square ${String.fromCharCode(97 + c)}${8 - r} ${
                      piece ? `${piece.color === 'w' ? 'White' : 'Black'} ${piece.type}` : 'empty'
                    }`}
                  >
                    {isTarget && !piece && (
                      <span className="w-3 h-3 rounded-full bg-[#22D3EE]/80 pointer-events-none" />
                    )}
                    {isTarget && piece && (
                      <span className="absolute inset-1 rounded border-2 border-[#ff71ce] pointer-events-none" />
                    )}
                    {piece && (
                      <span
                        className={`leading-none transition-transform duration-150 ${
                          piece.color === 'w'
                            ? 'text-[#FAFAFA] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]'
                            : 'text-[#A78BFA] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                        }`}
                      >
                        {PIECE_UNICODE[`${piece.color}${piece.type}`]}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Controls & Move Log */}
        <div className={`${compact ? '' : 'lg:col-span-5'} flex flex-col justify-between space-y-4`}>
          <div className="rounded-lg bg-[#09090B] border border-white/10 p-3.5">
            <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-2">
              <span className="font-mono">Algebraic Move Log</span>
              <button
                type="button"
                onClick={loadSicilian}
                className="text-[#22D3EE] hover:underline font-mono text-xs whitespace-nowrap"
              >
                Load Sicilian Opening
              </button>
            </div>
            <div className="space-y-1 max-h-36 overflow-y-auto font-mono text-xs text-[#FAFAFA] tabular-nums">
              {moveHistory.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between py-0.5 text-[#A1A1AA]">
                  <span className="text-[#71717A] mr-2">{String(idx + 1).padStart(2, '0')}.</span>
                  <span className="flex-1 text-[#FAFAFA]">{entry}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="text-xs text-[#A1A1AA]">
              Click any White piece (`♙ ♘ ♗ ♖ ♕ ♔`) to make a move.
            </div>
            <a
              href="https://playchessx.online"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] text-xs font-semibold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Visit playchessx.online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
