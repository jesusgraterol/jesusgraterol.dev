import rawPortfolio from './portfolio.json' with { type: 'json' };
import { PortfolioSchema, type IPortfolio } from './types.ts';

// canonical portfolio content parsed once at build time
export const PORTFOLIO: IPortfolio = PortfolioSchema.parse(rawPortfolio);
