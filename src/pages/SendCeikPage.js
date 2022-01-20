import React, { useState } from 'react'
import { prepare, request, getResult } from 'klip-sdk'
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import './SendCeikPage.scss'

export default function SendCeikPage() {
  const [SEND_REQUEST, SHOW_LOADING, SHOW_RESULT] = [1, 2, 3]

  const [step, setStep] = useState(SEND_REQUEST)

  const to = '0xAd70df6Bd78734721F42CD8cCACe42b25D83Aa65'
  const contract = '0x18814b01b5CC76F7043E10fd268cc4364dF47dA0'
  // const bappName = 'CEIK전송'
  const bappName = '후원하기'
  const amount = '1'

  // const contract = '0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654'
  // // const bappName = 'CEIK전송'
  // const bappName = 'KSP'
  // const amount = '0.1'

  const sendPrepareRequest = async () => {
    const res = await prepare.sendToken({ bappName, to, amount, contract })

    if (res.request_key) {
      setStep(SHOW_LOADING)
      request(res.request_key)
      startPollingResult(res.request_key)
    }
  }

  const startPollingResult = (requestKey) => {
    const id = setInterval(async () => {
      const res = await getResult(requestKey)
      if (res.status === 'completed') {
        clearTimeout(id)
        setStep(SHOW_RESULT)
      }
    }, 1000);
  }

  return (
    <div className='sendceik-page'>
      {step === SEND_REQUEST &&
        (<>
          <div className='title'>1CEIK를<br /> 아래 주소로 후원</div>
          <div className='address'>{to}</div>
          <Button onClick={sendPrepareRequest}>CEIK 후원하기</Button>
        </>)}
      {step === SHOW_LOADING && (
        <Spinner />
      )}
      {step === SHOW_RESULT && (
        <div className='result'>
          <img src="https://klipwallet.com/img/home-klip-user-guide-event.png" />
          <div className='message'>
            후원이 완료되었습니다!!
          </div>
        </div>
      )}
    </div>
  )
}
