import './tableMarket.scss';

export const TableMarket = () => {
    return (
        <>
            <table className="table table_spacing">
                <thead>
                    <tr>
                        <th scope="col">Pacote</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quantidade de Cartas</th>
                        <th scope="col">Informações</th>
                        <th className="text-center" scope="col">
                            Comprar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pacote Raro</td>
                        <td>500</td>
                        <td>5</td>
                        <td>C(%)R(%)MR(%)E(%)L(%)</td>
                        <div className="text-center">
                            <button type="button" className="btn btn-outline-success">
                                X
                            </button>
                        </div>
                    </tr>
                    <tr>
                        <td>Pacote Pequeno</td>
                        <td>50</td>
                        <td>2</td>
                        <td>C(%)R(%)MR(%)E(%)L(%)</td>
                        <div className="text-center">
                            <button type="button" className="btn btn-outline-success">
                                X
                            </button>
                        </div>
                    </tr>
                    <tr>
                        <td>Mega Pacote</td>
                        <td>1500</td>
                        <td>15</td>
                        <td>C(%)R(%)MR(%)E(%)L(%)</td>
                        <div className="text-center">
                            <button type="button" className="btn btn-outline-success">
                                X
                            </button>
                        </div>
                    </tr>
                </tbody>
            </table>
            <div>Legenda: C(Comun), R(Raro), MR(Muito Raro), E(Épico), L(Lendário)</div>
        </>
    );
};
