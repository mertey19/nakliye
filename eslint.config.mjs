import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Next.js 16 düz (flat) ESLint yapılandırması.
 * core-web-vitals kuralları, performansı doğrudan etkileyen hataları
 * (ör. <img> yerine next/image, senkron script) derleme öncesi yakalar.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
