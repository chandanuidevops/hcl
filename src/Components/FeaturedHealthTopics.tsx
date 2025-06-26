import { Box } from "@mui/material";
import { featuredCards } from "../Mockdata/featuredHealthTopicsData";
import type { CardType } from "./CardComp";
import CardComp from "./CardComp";

const FeaturedHealthTopics = () => {
    const showCards = (cardItem: CardType) => {
        return (
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'2rem'}}>
                <CardComp card={cardItem} />
            </Box>
        );
    };

    return <Box className="feature-cards" sx={{display:'flex', alignItems:'center', padding:'3rem', gap:'2rem'}}>{featuredCards.map(showCards)}</Box>;
};

export default FeaturedHealthTopics;
