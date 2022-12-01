const form = document.getElementById('vote-form');
const btn = document.getElementById('vote-btn');


form.addEventListener('submit', (e) => {
    
    // btn.disable = true;
    const choice = document.querySelector('input[name=option]:checked').value;
    console.log(choice);
    const data= { option: choice};

    fetch('http://localhost:3001/poll', {
        method:'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type':'application/json'
        })
    })
    .then( res => res.json())
    .then( data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});

console.log(parsed_data);
const poll = JSON.parse(parsed_data);

let dataPoints = [
    { label: poll.options[0].text, y: poll.options[0].val},
    { label: poll.options[1].text, y: poll.options[1].val},
    { label: poll.options[2].text, y: poll.options[2].val},
    { label: poll.options[3].text, y: poll.options[3].val},
];

const chartContainer = document.querySelector('#chartContainer');

if( chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'poll results'
        },
        data:[
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('f66f339574913b40b1bc', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('poll');
    channel.bind('vote', function(data) {
      dataPoints = dataPoints.map(x => {
        if( x.label == data.option){
            x.y += data.points;
            return x;
        }
        else return x;
      });
      chart.render();
    });
}