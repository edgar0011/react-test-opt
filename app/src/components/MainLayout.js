/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import Component from 'react';
import { Link } from 'react-router';

import { Container, Row, Col} from 'reactstrap';

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const title = 'OPT X test assignment';

        return (
          <Container>
            <Row>
              <Col>
                <div class="jumbotron">
                  <h1>{title}</h1>
                  <Row>
                    <Col>
                      <ul class=" nav justify-content-center">
                        <li><Link to="/" activeClassName="active" class="nav-item nav-link">Main</Link></li>
                        <li><Link to="Calc" activeClassName="active" class="nav-item nav-link">Calc</Link></li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <Row>
              <Col><div>{this.props.children}</div></Col>
            </Row>
          </Container>
        )
    }
}