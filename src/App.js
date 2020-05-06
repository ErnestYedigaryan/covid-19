import React from 'react';
import './App.css';
import {Col, Table, Container} from "reactstrap";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {

        fetch('https://covid19.mathdro.id/api/confirmed')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json
                })
            });

    }

    timeFormat(time) {
        let t = new Date(time);
        return (
            <td>{t.getDate()}/{t.getMonth()}/{t.getFullYear()} {t.getHours()}:{t.getMinutes()}:{t.getSeconds()}</td>)
    }

    render() {

        let {isLoaded, items} = this.state;

        if (!isLoaded) {
            return (
                <Col className="App mt-3">Loading...</Col>
            )
        }

        return (
            <Container className="App mt-5">
                <Col>
                    <Table dark borderless hover>
                        <thead>
                        <tr>
                            <th>Country</th>
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                            <th>Last Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                {(item.provinceState === null ? <td>{item.countryRegion}</td> :
                                <td>{item.countryRegion}, {item.provinceState}</td>)}
                                <td>{item.confirmed}</td>
                                <td>{item.recovered}</td>
                                <td>{item.deaths}</td>
                                {this.timeFormat(item.lastUpdate)}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Container>

        );
    }


}

export default App;
