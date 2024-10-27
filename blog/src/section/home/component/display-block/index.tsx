import { PROJECT_CONFIG } from "@/constant/home";
import Link from "next/link";
import Style from "./index.module.css";
import dynamic from "next/dynamic";
const AnimateCard = dynamic(() => import("@/component/animate-card"), {
  ssr: false,
});

const DisplayBlock = () => {
  return (
    <div className={Style.cardList}>
      {PROJECT_CONFIG.map(({ title, des, link }) => {
        return (
          <AnimateCard key={title}>
            <Link href={link}>
              <div className={Style.card}>
                <div>{title}</div>
                <div>{des}</div>
              </div>
            </Link>
          </AnimateCard>
        );
      })}
    </div>
  );
};

export default DisplayBlock;
