import React from 'react';

import Enzyme,{shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Homepage from "./body/homepage/homepage";

Enzyme.configure({ adapter: new Adapter() })

describe("check home page component",() => {
  it("renders homepage with isLoaded false",() => {
    const  wrapper = shallow(<Homepage/>)
    expect(wrapper.find("div.main-body").length).toEqual(0);
  })


  it("check homepage  isLoaded value",() => {
    const  wrapper = shallow(<Homepage/>)
    let isLoaded = wrapper.state("isLoaded")
    expect(isLoaded).toEqual(false);
  })

  it("check homepage with isLoaded True",()=>{
    const  wrapper = shallow(<Homepage/>)
    wrapper.setState({isLoaded:true,alldata:[]})
    expect(wrapper.find("div.main-body").length).toEqual(1);
  })


})