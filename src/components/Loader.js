import React from 'react'
import { Triangle } from 'react-loader-spinner'
function Loader() {
  return (
    <div>
      <Triangle
  visible={true}
  height="80"
  width="80"
  color="#ffff"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}

export default Loader
