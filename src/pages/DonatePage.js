import React, { useState } from 'react'
import { prepare, request, getResult } from 'klip-sdk'
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import './DonatePage.scss'

export default function DonatePage() {
  const [SEND_REQUEST, SHOW_LOADING, SHOW_RESULT] = [1, 2, 3]

  const [step, setStep] = useState(SEND_REQUEST)

  const to = '0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e'
  const bappName = '후원하기'
  const amount = '1'

  const sendPrepareRequest = async () => {
    const res = await prepare.sendKLAY({ bappName, to, amount })

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
    <div className='donate-page'>
      {step === SEND_REQUEST &&
        (<>
          <div className='title'>1KLAY를<br /> 아래 주소로 후원</div>
          <div className='address'>{to}</div>
          <Button onClick={sendPrepareRequest}>KLAY 후원하기</Button>
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
