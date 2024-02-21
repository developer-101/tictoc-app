
import { useState } from 'react';
import './styles.scss'

type TicTocType = 'X' | 'O' | null;

export default function TicToc() {

    const [values, setValues] = useState<TicTocType[][]>([[null, null, null], [null, null, null], [null, null, null]]);
    const [nextSign, setNextSign] = useState<'X' | 'O'>('X');
    const [position, setPosition] = useState({ top: 0, left: 0, display: 'block' })
    const [hasWinner, setHasWinner] = useState(false);


    function handleCellClick(rowIndex: number, cellIndex: number) {

        if (hasWinner)
            return;

        if (values[rowIndex][cellIndex] !== null)
            return;

        values[rowIndex][cellIndex] = nextSign;

        setValues(values);

        if (isVictory()) {
            setHasWinner(true);
            return;
        }

        setNextSign(nextSign => nextSign == 'X' ? 'O' : 'X');
    }

    function handleResetClick() {

        let newValues: TicTocType[][] = [[], [], []];

        for (let rowIndex = 0; rowIndex < 3; rowIndex++)
            for (let colIndex = 0; colIndex < 3; colIndex++)
                newValues[rowIndex][colIndex] = null;

        setValues(newValues);
        setHasWinner(false);
    }

    function handleMouseEnter() {
        setPosition({ ...position, display: 'block' });
    }

    function handleMouseLeave() {
        setPosition({ ...position, display: 'none' });
    }

    function handleMouseMove(e: React.MouseEvent<HTMLElement, MouseEvent>) {

        setPosition({ top: e.clientY + 10, left: e.clientX + 10, display: 'block' })
    }

    function isVictory() {

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {

            // check if all values in a row of the same sign
            if (values[rowIndex].every(i => i == 'X') || values[rowIndex].every(i => i == 'O'))
                return true;

            // check if all values in a column of the same sign
            for (let colIndex = 0; colIndex < 3; colIndex++) {

                if (values.map(i => i[colIndex]).every(i => i == 'X') || values.map(i => i[colIndex]).every(i => i == 'O'))
                    return true;
            }

            // check if diagonal values of the same sign
            let diag1 = [values[0][0], values[1][1], values[2][2]];
            let diag2 = [values[2][0], values[1][1], values[0][2]];

            if (diag1.every(i => i == 'X')
                || diag1.every(i => i == 'O')
                || diag2.every(i => i == 'X')
                || diag2.every(i => i == 'O'))
                return true;
        }

        return false;
    }


    // 3x3
    return (
        <>
            <div className='tictoc' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={(e) => handleMouseMove(e)}>
                <span className='nextsign-cursor' style={{ top: `${position.top}px`, left: `${position.left}px`, display: position.display }}>{nextSign}</span>
                {
                    values.map((r, rowIndex) => {

                        return r.map((c, colIndex) => {

                            return <div key={`index_${rowIndex}_${colIndex}`} className='tictoc-cell' onClick={() => handleCellClick(rowIndex, colIndex)}>{c}</div>
                        })
                    })
                }
            </div>
            <div className='next-move-text'>
                <span>Next move is {nextSign}</span>
            </div>
            <div className='reset-button'>
                <button onClick={handleResetClick}>Reset</button>
            </div>

            {hasWinner && <div>Winner is {nextSign}</div>}
        </>
    )
}