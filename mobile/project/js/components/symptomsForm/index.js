import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Card, Header, Title, Content, Text, Button, Icon, Left, Body, Right,Input,InputGroup,Item,Col,Radio,List,ListItem } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import TextField from '../TextField'
import { SegmentedControls } from 'react-native-radio-buttons';
import { setSymptom, createSymptomObject, symptomChanged, answerChanged, resetRating } from '../../actions/answers';
import styles from './styles';

const symptomsFormLang = require('./symptoms-form.json');

class symptomsForm extends Component {
    onSymptomInputChange(text) {
        this.props.symptomChanged(text);
    }

    static propTypes = {
        list: React.PropTypes.arrayOf(React.PropTypes.string),
        openDrawer: React.PropTypes.func,
        symptomChanged: React.PropTypes.func,
        answerChanged: React.PropTypes.func,
        resetRating: React.PropTypes.func,
        createSymptomObject: React.PropTypes.func,
    }

    onButtonPress() {
        const { record, mySymptoms, rating, symptom } = this.props;
        if (symptom != '') {
            mySymptoms[symptom] = this.props.setSymptom({ record, symptom, rating }).payload;
        }
        this.props.resetRating(rating);
        Actions.otherSymptoms({"lang":this.props.lang});
    }

    render() {
        let symptomsForm = symptomsFormLang[this.props.lang];
//        console.log(symptomsForm);
//        console.log(symptomsFormLang);

        return (
            <Container style={styles.container}>
                <Header style={{backgroundColor:'#F16C00'}}>
                    <Left>
                        <Button transparent onPress={this.props.openDrawer}>
                            <Icon active name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title> </Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
                            <Icon active name="power" />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Item regular style={styles.list}>
                        <TextField
                        style={styles.input}
                        placeholder={symptomsForm["placeholder"]}
                        value={this.props.symptom}
                        onChangeText={this.onSymptomInputChange.bind(this)}
                        />
                    </Item>

                    <Card style={styles.radios}>
                        <SegmentedControls
                        direction={'column'}
                        tint={'#F16C00'}
                        options={symptomsForm["options"]}
                        containerBorderRadius={0}
                        optionStyle={{fontSize:20, paddingTop: 8}}
                        optionContainerStyle={{ height: 60, alignItems: 'center' }}
                        selectedIndex={ this.props.rating }
                        onSelection={value => this.props.answerChanged(value, this.props.symptom)}
                        />
                    </Card>

                    <Grid style={styles.buttons}>
                        <Col>
                            <Button rounded light onPress={() => Actions.otherSymptoms({"lang":this.props.lang})} style={styles.center}>
                                <Text>{symptomsForm["cancel"]}</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button rounded onPress={() => this.onButtonPress()} style={styles.center}>
                                <Text>{symptomsForm["add"]}</Text>
                            </Button>
                        </Col>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    symptomChanged: text => dispatch(symptomChanged(text)),
    answerChanged: (rating, question) => dispatch(answerChanged(rating, question)),
    resetRating: rating => dispatch(resetRating(rating)),
    setSymptom: (record, symptom, rating) => dispatch(createSymptomObject(record, symptom, rating)),
  };
}

const mapStateToProps = state => ({
  selectedSymptom: state.records.selectedSymptom,
  mySymptoms: state.records.mySymptoms,
  symptom: state.answers.symptom,
  rating: state.answers.rating,
});

export default connect(mapStateToProps, bindAction)(symptomsForm);