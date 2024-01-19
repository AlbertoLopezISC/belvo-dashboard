import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';
import { useEffect, useState } from "react";


export default function PieChart({
    datasource
}) {
    const [dataset, setDataset] = useState([]);

    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Categoria de gastos'
        },
        tooltip: {
            pointFormat: '{(point.percentage):.1f}%',
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [
                    {
                        enabled: true,
                        distance: 20
                    },
                    {
                        enabled: true,
                        distance: -40,
                        format: '{(point.percentage):.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }
                ]
            }
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: dataset
            }
        ]
    }




    useEffect(() => {
        console.log(datasource);
        const categories = [...new Set(datasource.map(item => item.category ? item.category : 'otros'))];
        let datasetaux = [];
        categories.forEach(category => {
            const transactions = datasource.filter(item => item.category === category);
            const suma = transactions.reduce((acumulador, elemento) => acumulador + elemento.amount, 0);
            datasetaux.push({
                name: category,
                y: suma
            });
        });

        setDataset(datasetaux);
        console.log(datasetaux);
    }, [datasource, setDataset]);

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
}