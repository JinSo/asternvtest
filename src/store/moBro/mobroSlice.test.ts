// it('should set the correct campaign', () => {
//     expect(campaignReducer(state, setCurrent('ketelComfort'))).toEqual(expectedResult);
//   });

import reducer, { initMobroClient, MobroState } from "./mobroSlice";

const initialMobroState: MobroState = {
  sensors: {},
  hardware: {},
  settings: {},
  loading: false,
  init: false,
};

describe("Mobro Slice", () => {
  it("Should set loading state while init", () => {
    const action = { type: initMobroClient.pending };
    const newState = reducer(initialMobroState, action);
    const expectedState = { ...initialMobroState, ...{ loading: true } };

    expect(newState).toEqual(expectedState);
  });
  it("Should populate the store in the correct shape", () => {
    const sensorList = "Mock sensor object";
    const settings = "Mock settings object";

    const processor = "Mock processor object";
    const graphics = "Mock graphics object";
    const memory = {
      totalcapacity: 17179869184,
      count: 2,
      capacityunit: "B",
    };
    const hardwareList = {
      processor,
      graphics,
      memory,
    };

    const payload = {
      sensorList,
      hardwareList,
      settings,
    };
    const action = { type: initMobroClient.fulfilled, payload };
    const newState = reducer(initialMobroState, action);
    const expectedState: MobroState = {
      loading: false,
      init: true,
      sensors: sensorList,
      hardware: {
        processor,
        graphics,
        memory: { ...memory, ...{ totalcapacityGb: "16GB" } },
      },
      settings,
    };

    expect(newState).toEqual(expectedState);
  });
});
