import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'

export type CardType = {
    cardTitle:string
    cardDescription:string
}

type CardCompProps = {
  card: CardType
}


const CardComp = (props:CardCompProps) => {
    const {card} = props
  return (
    <>
      <Card sx={{ maxWidth: 345, padding:'2rem', boxShadow:'3' }}>

        <CardContent>
        <Typography gutterBottom variant="h4" sx={{fontWeight:'600'}} component="div">
          {card.cardTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight:'600' }}>
         {card.cardDescription}
        </Typography>
      </CardContent>
       <CardActions>
        <Button size="medium" variant='contained'>Learn More</Button>
      </CardActions>
      </Card>
    </>
  )
}

export default CardComp
