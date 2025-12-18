import { useInterval } from 'ahooks'
import { Button, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'

import tabConfig from '~tabConfig'
import type { Hitokoto } from '~types'

const { Text, Title, Link } = Typography
export default function Header() {
  const [hitokoto, setHitokoto] = useState<Hitokoto>()
  const getHitokoto = async () => {
    let res = await fetch(tabConfig.hitokotoApi).then((res) => res.json())
    setHitokoto(res?.data || res)
  }
  useInterval(() => getHitokoto(), 60000)
  useEffect(() => {
    getHitokoto()
  }, [])
  return [
    <div
      onClick={() => getHitokoto()}
      className="!text-white text-center sm:text-left text-shadow w-full sm:w-auto md:flex flex-row gap-3 cursor-pointer"
      key={'hitokoto'}>
      <Text className="!text-white">
        {hitokoto?.hitokoto || '今昔横云有雨，挂满山涧，故人来。'}
      </Text>
      <Text className="!text-white">-摘自 [{hitokoto?.from || '仙逆'}]</Text>
    </div>,
    <div
      key={'footer'}
      className="flex w-full flex-col md:flex-row items-center justify-center md:gap-2 text-white text-shadow">
      {tabConfig.footer?.power && (
        <div className="power flex items-center justify-center text-center">
          <Title level={5} className="text-md !text-white">
            Powered by
          </Title>
          <Button
            color="primary"
            type="link"
            variant="link"
            size="small"
            href={tabConfig.footer?.power.href}
            target="_blank">
            {tabConfig.footer?.power.text}
          </Button>
        </div>
      )}
      {(tabConfig.footer?.beian || tabConfig.footer?.copyright) && (
        <div className="copyright flex flex-col items-center md:flex-row gap-2">
          {tabConfig.footer?.copyright && (
            <Text className="text-sm font-bold text-white">
              {tabConfig.footer?.copyright}
            </Text>
          )}
          {tabConfig.footer?.beian && (
            <Link
              className="text-sm font-bold text-white"
              href={`https://beian.miit.gov.cn/`}
              target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="159"
                height="20"
                aria-label={`粤ICP备：${tabConfig.footer?.beian}`}>
                <linearGradient id="b" x2="0" y2="100%">
                  <stop offset="0" stopColor="#90c" stopOpacity=".7" />
                  <stop offset="1" stopOpacity=".1" />
                </linearGradient>
                <clipPath id="a">
                  <rect width="159" height="20" rx="3" fill="#fff" />
                </clipPath>
                <g clipPath="url(#a)">
                  <path fill="#555" d="M0 0h68v20H0z" />
                  <path fill="#e1d492" d="M68 0h91v20H68z" />
                  <path fill="url(#b)" d="M0 0h159v20H0z" />
                </g>
                <g
                  fill="#fff"
                  textAnchor="middle"
                  fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif"
                  textRendering="geometricPrecision"
                  fontSize="110">
                  <image
                    x="5"
                    y="3"
                    width="14"
                    height="14"
                    xlinkHref="data:image/png;base64,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"
                  />
                  <text
                    aria-hidden="true"
                    x="435"
                    y="150"
                    fill="#010101"
                    fillOpacity=".3"
                    transform="scale(.1)"
                    textLength="410">
                    粤ICP备
                  </text>
                  <text x="435" y="140" transform="scale(.1)" textLength="410">
                    粤ICP备
                  </text>
                  <text
                    aria-hidden="true"
                    x="1125"
                    y="150"
                    fill="#ccc"
                    fillOpacity=".3"
                    transform="scale(.1)"
                    textLength="810">
                    {tabConfig.footer?.beian}
                  </text>
                  <text
                    x="1125"
                    y="140"
                    transform="scale(.1)"
                    fill="#333"
                    textLength="810">
                    {tabConfig.footer?.beian}
                  </text>
                </g>
              </svg>
            </Link>
          )}
        </div>
      )}
    </div>
  ]
}
