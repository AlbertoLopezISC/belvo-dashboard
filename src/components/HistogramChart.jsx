import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';
import formatDate from "@/app/helpers/dateHelpers";


export default function HistogramChart({
    datasource
}){


    const options = {
        chart: {
          type: 'column',
          borderRadius: 19,
          backgroundColor: null, // Transparente
          plotBorderColor: 'rgba(182, 182, 182, 0.15)',
          plotBorderWidth: 1.497,
        },
        title: {
          text: null,
        },
        xAxis: {
          categories: datasource.map(item => formatDate(item.created_at)),
          labels: {
            style: {
              fontSize: '8px',
              color: '#4F4F4F',
              fontWeight: 500,
            },
          },
        },
        yAxis: {
          title: {
            text: null,
          },
          labels: {
            formatter: function(value) {
              return '$' + Highcharts.numberFormat(value, 0, '.', ',');
            },
            style: {
              fontSize: '8px',
              color: '#4F4F4F',
              fontWeight: 500,
            },
          },
        },
        plotOptions: {
          column: {
            color: '#F8A04E',
            borderRadius: 19,
          },
        },
        series: [
          {
            data: datasource.map(item => item.amount),
            name: 'Transacciones',
            dataLabels: {
              enabled: true,
              format: '${point.y}', // Etiqueta con el formato de la cantidad
            },
          },
        ],
      };

      console.log(datasource)
    

    return (
        <HighchartsReact highcharts={Highcharts}  options={options}/>
    )
}