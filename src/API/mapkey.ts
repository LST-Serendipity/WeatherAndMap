
export default function getKey(){
    const key=import.meta.env.VITE_TIANDITU_API_KEY
    const vec_w="https://t0.tianditu.gov.cn/DataServer?T=vec_w/&x={x}&y={y}&l={z}&tk="+key
    const img_w="https://t0.tianditu.gov.cn/DataServer?T=img_w/&x={x}&y={y}&l={z}&tk="+key
    const ter_w="https://t0.tianditu.gov.cn/DataServer?T=ter_w/&x={x}&y={y}&l={z}&tk="+key
    const cva_w="https://t0.tianditu.gov.cn/DataServer?T=cva_w/&x={x}&y={y}&l={z}&tk="+key

    return{vec_w,img_w,ter_w,cva_w}
}