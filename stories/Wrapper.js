import React from 'react'

const styles = {
  width: '300px'
};

const Wrapper = (storyFn) => (
  <div style={styles}>
    { storyFn() }
  </div>
)

export default Wrapper