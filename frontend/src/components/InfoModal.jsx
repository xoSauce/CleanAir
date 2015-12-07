'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Section = require('./Section.jsx');
var VentilationSection = require('./VentilationSection.jsx');

export default class InfoModal extends React.Component {
  close(){
    this.props.history.replaceState(null, '/map');
  }
  getSections(){
    var preferences = this.props.preferences;
    var sections = {
      age: [],
      children: [],
      respiratory_issues: []
    };
    //age sections
    if(preferences.age==="20"){
      sections.age.push('Air pollution is a modern hazard, especially so for people within the age group selected. The World Health Organisation (WHO) defines adolescence to be the period up to and including the age of 19. It is this group which is most susceptible to air pollution due to a higher rate of outdoor activities, still developing lung capacity and higher metabolic rates. Being aware of air pollution and reducing your intake is all part of ensuring a healthier lifestyle. Tied in with this, is reducing your indoor levels of pollution intake. A method this can easily be done is discussed in the section below.');
    }
    if(preferences.age==="20-30"||preferences.age==="30-40"||preferences.age==="40-50"||preferences.age==="50-60"){
      sections.age.push('Air pollution is a modern hazard and a growing source of human mortality. Both short and long-term exposure to pollution has been linked to premature mortality and reduced life expectancy. Being aware of air pollution and reducing your intake is all part of ensuring a healthier lifestyle. Tied in with this, is reducing your indoor levels of pollution intake. A method this can easily be done is discussed in the section below.');
    }
    if(preferences.age==="60"){
      sections.age.push('Air pollution is a modern hazard, especially so for people within the age group selected. Both short and long-term exposure to pollution has been linked to premature mortality and reduced life expectancy. While exposure to air pollution is known to affect respiratory diseases and cardiac health, recent research in environmental neurosciences shows air pollution also impacts and impairs cognitive function, aging the brain by up to 3 years in the long-term. As one grows older, the surrounding environmental hazards can also exacerbate heart disease and even stroke. Being aware of air pollution and reducing your intake is all part of ensuring a healthier lifestyle. Tied in with this, is reducing your indoor levels of pollution intake. A method this can easily be done is discussed in the section below.');
    }
    //children sections
    if(preferences.children==="yes"){
      sections.children.push('Children and adolescences are especially vulnerable to pollution due to numerous reasons: spending more time in outdoor activities, faster metabolic rates and still developing lungs.  Exposure, in the long term, can contribute to the development of asthma and other health complications in young people. It also exacerbates pre-existing respiratory conditions. Infants and children below the age of 6 are particularly susceptible to air pollution’s impacts. Giving it is within this age range that critical developments such as the maturing of the immune system, lungs and brains, crucial to the health of a child occur – continuous exposure to moderate-high levels of pollution can lead to lasting effects on their future health.');
    }
    if(preferences.children=="expecting"){
      sections.children.push('Multiple studies have found air pollution exposure to be a risk to expecting mothers.  Links between levels of air pollution and babies born prematurely, having low birth weight (LBW) or congenital heart defects. Thus selecting the right housing area and ensuring the home is well ventilated are extremely important.');
    }
    //respiratory issues section
    if(preferences.respiratory_issues.includes('asthma')){
      sections.respiratory_issues.push('Through exposure to pollution, asthmatics may experience aggravation of the lungs. If you are asthmatic, this can trigger asthma attacks in the short-term and increase susceptibility to damaging respiratory infections that can sometimes go fatally undetected in the long run. Caution should definitely be taken in housing choice and keeping one’s home well ventilated should be made a priority to protect your health.');
    }
    if(preferences.respiratory_issues.includes('copd')){
      sections.respiratory_issues.push('Air pollution has been found to severely worsen the symptoms of COPD sufferers. As such, sufferers of COPD should exercise caution and pay close attention to their levels of air pollution intake. As location remains one of the most important factors when choosing a home, other steps such as ventilating your home at the right time can be taken to reduce your air pollution intake and lead to a better quality of life.');
    }
    if(preferences.respiratory_issues.includes('none')){
      sections.respiratory_issues.push('Although you have indicated you have no respiratory conditions, even for people considered healthy, air that is polluted can cause eye, nose and throat irritation, respiratory irritation or breathing difficulties during exercise and outdoor activities. The long-term exposure to polluted air can still have permanent health effects such as the shortening of life span, accelerated aging of the lungs and the development of diseases such as asthma, bronchitis and COPD amongst others. As location remains one of the most important factors when choosing a home, other steps such as ventilating your home at the right time can be taken to reduce your air pollution intake and lead to a better quality of life.');
    }

    return sections;
  }
  render(){
    var sections = this.getSections();

    return(
      <div className="modal-wrapper" onClick={this.close.bind(this)}>
        <div className="modal-inner">
          <div className="info-wrapper">
            <Link id="close-info" to={"/map"}>Close</Link>
            <h1>Recommendations</h1>
            <Section title="Age-related air pollution impacts" text={sections.age}/>
            <Section title="Impacts on children and adolescents" text={sections.children}/>
            <Section title="Respiratory health and air pollution" text={sections.respiratory_issues}/>
            <VentilationSection title="When you should ventilate your home"/>
          </div>
        </div>
      </div>
      )
  }
}
