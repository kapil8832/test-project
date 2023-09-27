import React, { useEffect } from 'react';
import { jsPlumb } from "jsplumb"

const JsPlumbExample = () => {
  useEffect(() => {
    const instance =jsPlumb.getInstance()

    // Make elements draggable
    instance.draggable('element1');
    instance.draggable('element2');

    // Define endpoints and anchors
    instance.addEndpoint('element1', {
      endpoint: 'Dot',
      anchor: 'Right'
    });

    instance.addEndpoint('element2', {
      endpoint: 'Dot',
      anchor: 'Left'
    });

    // Connect the endpoints
    instance.connect({
      source: 'element1',
      target: 'element2'
    });
  }, []);

  return (
    <div id='container'>
      <div
        id="element1"
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightblue'
        }}
      >
        Element 1
      </div>
      <div
        id="element2"
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightgreen'
        }}
      >
        Element 2
      </div>
    </div>
  );
};

export default JsPlumbExample;
