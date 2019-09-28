import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardTitle, CardText } from 'reactstrap';
import axios from 'axios';

const StyledDiv = styled.div`
    background-color: rgba(167, 198, 226, 0.5);
    display: flex;
    width: 30%;
    flex-direction: column;
    border-radius: 15px;
    margin: 15px 100px;
    font-weight: 600;
    box-shadow: 5px 5px rgba(0, 0, 0, .3);
`

const StyledCard = styled(Card)`
    height: 120px;
`

const StyledTitle = styled(CardTitle)`
    width: 100%;
    background: rgb(167, 198, 226);
    padding: 10px 0;
    border-radius: 15px 15px 0px 0px;
    font-weight: 900;
`

export default function CharacterCard() {
    // dependancy array
    const [characters, setCharacters] = useState([{}]);
    // data request
    useEffect(() => {
        axios.get('https://swapi.co/api/people/')
            .then((res) => {
                const charArr = res.data.results;
                setCharacters(charArr);
                console.log('here they are', res)
            })
    }, [])

    // return built card

    return (
        <div className="main-container">
            {characters.map(char => {
                // convert to freedom units
                const charWeight = Math.trunc(char.mass * 2.205);
                const charTempHeight = (char.height / 30);
                // Chop off the decimals
                const charHeight = charTempHeight.toFixed(2);
                return <StyledDiv>
                    <StyledCard>
                        <StyledTitle>
                            <CardTitle>{char.name}</CardTitle>
                        </StyledTitle>
                        <CardText>
                            Weight: {charWeight}lbs
                        </CardText>
                        <CardText>
                            Height: {charHeight}ft
                        </CardText>
                    </StyledCard>
                </StyledDiv>
            })}
        </div>
    )
}