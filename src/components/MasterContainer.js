import React, { useRef, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'

import Actions from '../redux/action'
import Constants from '../utils/Constants'
import Searchplaceview from './searchplaceview'
import { connect } from 'react-redux'

const { MasterDrawerMenuType, AppNotify } = Constants

const MasterContainer = (props) => {
  const { userConfig } = props

  const [state, setState] = useState({})

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }))

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const renderScreen = () => {
    return <Searchplaceview menuType={MasterDrawerMenuType.Search} />
  }
  return renderScreen()
}

const mapStateToProps = (state) => {
  return {
    userConfig: state.userConfig,
    userPref: state.userPref,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserConfig: (userConfig) => dispatch(Actions.setUserConfig(userConfig)),
    setUserPref: (userPref) => dispatch(Actions.setUserPref(userPref)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterContainer)
