import styled,{keyframes}from"styled-components";
 
const COLORS={primary:"#831614",primaryDark:"#65100f",yellow:"#ffdb53",yellowDark:"#e3b900",background:"#fff",white:"#ffffff",text:"#1c1c1c",muted:"#777777",border:"#d8d8d8",danger:"#d62828",dangerDark:"#b71c1c",cream:"#fff7d0",gray:"#666666"};
 
export const Page=styled.div`
min-height:100vh;width:100%;background:#fff;color:${COLORS.text};font-family:"Poppins",sans-serif;box-sizing:border-box;overflow-x:hidden;
`;
 
export const Content=styled.main`
width:min(97%,1650px);margin:35px auto 55px;box-sizing:border-box;
@media(max-width:1100px){width:96%;margin-top:30px}
@media(max-width:700px){width:94%;margin:22px auto 40px}
`;
 
export const Header=styled.header`
position:relative;display:flex;align-items:center;justify-content:center;gap:30px;margin-bottom:25px;
@media(max-width:850px){flex-direction:column;align-items:center;text-align:center;gap:20px}
`;
 
export const TitleArea=styled.div`
display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;
`;
 
export const Title=styled.h1`
margin:0 0 10px;color:#831614;font-size:clamp(2.8rem,5vw,4.8rem);font-weight:900;letter-spacing:-2px;line-height:1.05;
@media(max-width:768px){font-size:clamp(2.5rem,9vw,4rem);letter-spacing:-1.5px}
@media(max-width:480px){font-size:2.3rem}
`;
 
export const Subtitle=styled.p`
width:100%;max-width:700px;margin:8px auto 0;color:#777;font-size:1.55rem;line-height:1.6;text-align:center;
@media(max-width:768px){font-size:1.1rem}
@media(max-width:480px){font-size:1rem}
`;
 
export const FilterContainer=styled.div`
width:fit-content;max-width:100%;margin:0 auto;padding:5px;display:flex;align-items:center;justify-content:center;gap:5px;background:#fff;border:1px solid #d5d5d5;border-radius:13px;box-shadow:0 8px 22px rgba(0,0,0,.08),0 2px 5px rgba(0,0,0,.04);
@media(max-width:600px){width:100%}
`;
 
export const FilterButton=styled.button`
position:relative;min-width:160px;height:55px;padding:0 16px;display:flex;align-items:center;justify-content:center;gap:10px;border:2px solid ${({$active})=>$active?COLORS.primary:"#eee"};border-radius:9px;background:${({$active})=>$active?COLORS.primary:"#fff"};color:${({$active})=>$active?"#fff":"#111"};font-family:inherit;font-size:16px;font-weight:650;cursor:pointer;overflow:hidden;isolation:isolate;transition:transform .3s cubic-bezier(.22,1,.36,1),border-color .25s ease,background .25s ease,box-shadow .3s ease,color .25s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:35px;height:35px;border-radius:50%;background:${COLORS.yellow};transform:translate(-50%,-50%) scale(0);transition:transform .65s cubic-bezier(.16,1,.3,1);z-index:-1;pointer-events:none}
&:hover{transform:translateY(-8px);border-color:${COLORS.primary};color:#111;box-shadow:0 18px 35px rgba(131,22,20,.16);&::before{transform:translate(-50%,-50%) scale(11)}strong{color:#111;transform:scale(1.05);background:rgba(255,255,255,.45)}span{color:#111}}
&:active{transform:translateY(-3px) scale(.98)}
&:focus-visible{outline:3px solid ${COLORS.yellow};outline-offset:4px}
strong{position:relative;z-index:2;min-width:27px;height:27px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:${({$active})=>$active?"rgba(255,255,255,.16)":"#f1f1f1"};color:${({$active})=>$active?"#fff":"#777"};font-size:12px;font-weight:700;transition:color .25s ease,background .25s ease,transform .3s ease}
span{position:relative;z-index:2;transition:color .25s ease,transform .3s ease}
@media(max-width:600px){flex:1;min-width:0;height:41px;padding:0 8px;font-size:12px;border-radius:8px;&::before{width:28px;height:28px}&:hover{transform:translateY(-5px);&::before{transform:translate(-50%,-50%) scale(9)}}strong{min-width:23px;height:23px;font-size:10px}}
`;
 
export const LoadingState=styled.div`
min-height:300px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:13px;color:#777;font-size:16px;
`;
 
const spin=keyframes`to{transform:rotate(360deg)}`;
 
export const Spinner=styled.div`
width:30px;height:30px;border:3px solid #eee;border-top-color:${COLORS.primary};border-radius:50%;animation:${spin} .8s linear infinite;
`;
 
export const TableContainer=styled.section`
width:100%;background:#fff;border:2px solid #d3d3d3;border-radius:20px;overflow:hidden;box-shadow:0 18px 45px rgba(0,0,0,.11),0 3px 8px rgba(0,0,0,.05);
`;
 
export const TableHeader=styled.div`
min-height:88px;padding:20px 28px;display:flex;align-items:center;justify-content:space-between;gap:20px;box-sizing:border-box;border-bottom:2px solid #dedede;
@media(max-width:600px){padding:16px 17px;min-height:70px}
`;
 
export const TableHeaderInfo=styled.div`
display:flex;flex-direction:column;gap:5px;min-width:0;
`;
 
export const TableTitle=styled.h2`
margin:0;color:#252525;font-size:24px;font-weight:750;
@media(max-width:600px){font-size:20px}
`;
 
export const TableDescription=styled.p`
margin:0;color:#777;font-size:16px;line-height:1.45;
@media(max-width:600px){font-size:13px}
`;
 
export const DownloadButton=styled.button`
position:relative;min-height:48px;padding:0 19px;display:inline-flex;align-items:center;justify-content:center;gap:9px;flex-shrink:0;border:2px solid ${COLORS.primary};border-radius:9px;background:${COLORS.primary};color:#fff;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer;overflow:hidden;isolation:isolate;transition:color .25s ease,transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:18px;height:18px;border-radius:50%;background:${COLORS.yellow};transform:translate(-50%,-50%) scale(0);transition:transform .55s cubic-bezier(.16,1,.3,1);z-index:-1;pointer-events:none}
svg{position:relative;z-index:2;width:19px;height:19px;flex-shrink:0;stroke-width:2.3}
span{position:relative;z-index:2}
&:hover{color:#111;transform:translateY(-2px);box-shadow:0 8px 18px rgba(131,22,20,.2);&::before{transform:translate(-50%,-50%) scale(14)}}
&:active{transform:scale(.97)}
&:focus-visible{outline:2px solid ${COLORS.yellow};outline-offset:3px}
@media(max-width:600px){min-height:40px;padding:0 11px;font-size:13px;gap:6px;span{display:none}svg{width:18px;height:18px}}
`;
 
export const TableWrapper=styled.div`
width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:#ffdb53 #e2e2e2;
&::-webkit-scrollbar{height:9px}
&::-webkit-scrollbar-track{background:#e8e8e8}
&::-webkit-scrollbar-thumb{background:#ffdb53;border-radius:20px}
`;
 
export const Table=styled.table`
width:100%;min-width:1050px;border-collapse:collapse;table-layout:fixed;
thead{background:linear-gradient(135deg,#ffdb53,#ffdb53)}
th{height:65px;padding:0 27px;color:#111;text-align:left;font-size:15px;font-weight:750;text-transform:uppercase;letter-spacing:.75px;white-space:nowrap;&:last-child{text-align:center}}
td{height:96px;padding:12px 27px;color:#333;font-size:17px;border-bottom:1px solid #ddd;vertical-align:middle;white-space:nowrap;transition:background .2s ease}
tbody tr{background:#fff;transition:background .2s ease}
tbody tr:nth-child(even){background:#f8f8f8}
tbody tr:hover{background:#fff8dc}
th:nth-child(1),td:nth-child(1){width:32%}
th:nth-child(2),td:nth-child(2){width:16%}
th:nth-child(3),td:nth-child(3){width:21%}
th:nth-child(4),td:nth-child(4){width:16%}
th:nth-child(5),td:nth-child(5){width:15%}
@media(max-width:1100px){min-width:980px;th{padding:0 22px}td{padding:11px 22px}}
@media(max-width:900px){min-width:900px;th{height:58px;padding:0 18px;font-size:13px}td{height:88px;padding:10px 18px;font-size:15px}}
@media(max-width:600px){min-width:850px;th{height:52px;padding:0 14px;font-size:11px}td{height:78px;padding:8px 14px;font-size:13px}}
`;
 
export const StudentCell=styled.div`
display:flex;align-items:center;gap:14px;min-width:0;
`;
 
export const StudentAvatar=styled.div`
width:48px;height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:50%;background:linear-gradient(135deg,${COLORS.yellow},#f5c62d);color:#5e4900;font-size:17px;font-weight:750;box-shadow:inset 0 0 0 1px rgba(0,0,0,.07);
@media(max-width:600px){width:41px;height:41px;font-size:14px}
`;
 
export const StudentInfo=styled.div`
min-width:0;display:flex;flex-direction:column;gap:4px;
`;
 
export const StudentName=styled.span`
display:block;max-width:300px;overflow:hidden;text-overflow:ellipsis;color:#222;font-size:17px;font-weight:700;line-height:1.35;
@media(max-width:600px){max-width:250px;font-size:14px}
`;
 
export const Badge=styled.span`
min-height:34px;padding:0 13px;display:inline-flex;align-items:center;justify-content:center;gap:7px;border-radius:7px;background:${({$type})=>$type==="course"?"#f0f0f1":"#fff5c9"};color:${({$type})=>$type==="course"?"#444":"#735c00"};border:1px solid ${({$type})=>$type==="course"?"#d8d8da":"#e5ce73"};font-size:14px;font-weight:650;white-space:nowrap;
svg{font-size:15px}
@media(max-width:600px){min-height:28px;padding:0 9px;font-size:11px}
`;
 
export const TurnoBadge=styled.span`
display:inline-flex;align-items:center;gap:8px;color:#444;font-size:16px;font-weight:650;white-space:nowrap;
span{width:9px;height:9px;flex-shrink:0;border-radius:50%;background:${({$turno})=>$turno==="Manhã"?"#f0b900":$turno==="Tarde"?"#e87927":$turno==="Noite"?"#6256b7":"#777"}}
@media(max-width:600px){font-size:12px;span{width:7px;height:7px}}
`;
 
export const Actions=styled.div`
display:flex;align-items:center;justify-content:center;gap:14px;
@media(max-width:600px){gap:10px}
`;
 
export const ActionButton=styled.button`
position:relative;width:38px;height:38px;padding:0;display:flex;align-items:center;justify-content:center;background:transparent;border:none;border-radius:50%;color:${({$variant})=>$variant==="delete"?"#d62828":"#831614"};cursor:pointer;overflow:hidden;isolation:isolate;appearance:none;transition:color .25s ease,transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:10px;height:10px;border-radius:50%;background:${({$variant})=>$variant==="delete"?"#111":COLORS.yellow};transform:translate(-50%,-50%) scale(0);transition:transform .55s cubic-bezier(.16,1,.3,1);z-index:-1;pointer-events:none}
svg{position:relative;z-index:2;width:21px;height:21px;stroke-width:2}
&:hover{color:${({$variant})=>$variant==="delete"?"#fff":"#111"};transform:translateY(-2px) scale(1.08);box-shadow:0 7px 16px rgba(0,0,0,.16);&::before{transform:translate(-50%,-50%) scale(5)}}
&:active{transform:scale(.9)}
&:focus-visible{outline:2px solid ${COLORS.yellow};outline-offset:3px}
&:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
&:disabled::before{display:none}
@media(max-width:600px){width:31px;height:31px;svg{width:17px;height:17px}}
`;
 
export const EmptyState=styled.div`
min-height:250px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:35px 20px;text-align:center;
`;
 
export const EmptyIcon=styled.div`
width:62px;height:62px;margin-bottom:16px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#fff5c9;border:1px solid #e5ce73;color:#a27e00;font-size:27px;
`;
 
export const EmptyTitle=styled.h3`
margin:0 0 6px;color:#333;font-size:20px;font-weight:750;
`;
 
export const EmptyText=styled.p`
max-width:400px;margin:0;color:#777;font-size:15px;line-height:1.6;
`;
 
export const ModalOverlay=styled.div`
position:fixed;inset:0;z-index:9999;padding:20px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;background:rgba(20,15,15,.58);backdrop-filter:blur(7px);overflow-y:auto;
`;
 
const modalAppear=keyframes`
from{opacity:0;transform:translateY(16px) scale(.97)}
to{opacity:1;transform:translateY(0) scale(1)}
`;
 
export const Modal=styled.div`
width:100%;max-width:470px;max-height:calc(100vh - 40px);overflow-y:auto;box-sizing:border-box;padding:28px;background:#fff;border:2px solid #d4d4d4;border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.28);animation:${modalAppear} .25s cubic-bezier(.22,1,.36,1);
@media(max-width:600px){padding:23px 19px;border-radius:17px}
`;
 
export const ModalHeader=styled.div`
display:flex;align-items:flex-start;justify-content:space-between;gap:15px;margin-bottom:22px;
`;
 
export const ModalTitle=styled.h2`
margin:0 0 6px;color:${({$danger})=>$danger?COLORS.danger:COLORS.primary};font-size:25px;font-weight:750;line-height:1.2;
`;
 
export const ModalDescription=styled.p`
margin:0;color:#777;font-size:15px;line-height:1.6;
`;
 
export const ModalClose=styled.button`
position:relative;width:34px;height:34px;flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:0;border:none;background:transparent;color:#888;border-radius:50%;cursor:pointer;overflow:hidden;isolation:isolate;transition:color .25s ease,transform .25s ease,box-shadow .25s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:10px;height:10px;border-radius:50%;background:#eee;transform:translate(-50%,-50%) scale(0);transition:transform .55s cubic-bezier(.16,1,.3,1);z-index:-1;pointer-events:none}
svg{position:relative;z-index:2;width:19px;height:19px}
&:hover{color:#222;transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.12);&::before{transform:translate(-50%,-50%) scale(5)}}
&:focus-visible{outline:2px solid ${COLORS.yellow};outline-offset:2px}
`;
 
export const Form=styled.div`
display:flex;flex-direction:column;gap:17px;
`;
 
export const FormGroup=styled.div`
display:flex;flex-direction:column;gap:8px;
`;
 
export const Label=styled.label`
color:#333;font-size:15px;font-weight:650;
strong{color:${COLORS.danger}}
`;
 
export const Input=styled.input`
width:100%;min-height:50px;padding:0 14px;box-sizing:border-box;border:1px solid #cfcfcf;border-radius:10px;background:#f8f8f8;color:#222;font-family:inherit;font-size:15px;outline:none;transition:border-color .2s ease,background .2s ease,box-shadow .2s ease;
&::placeholder{color:#999}
&:focus{border-color:${COLORS.yellowDark};background:#fff;box-shadow:0 0 0 3px rgba(255,219,83,.16)}
`;
 
export const Select=styled.select`
width:100%;min-height:50px;padding:0 14px;box-sizing:border-box;border:1px solid #cfcfcf;border-radius:10px;background:#f8f8f8;color:#222;font-family:inherit;font-size:15px;outline:none;cursor:pointer;transition:border-color .2s ease,background .2s ease,box-shadow .2s ease;
&:focus{border-color:${COLORS.yellowDark};background:#fff;box-shadow:0 0 0 3px rgba(255,219,83,.16)}
`;
 
export const ModalButtons=styled.div`
display:flex;align-items:center;justify-content:flex-end;gap:10px;margin-top:9px;
@media(max-width:430px){flex-direction:column-reverse;width:100%}
`;
 
export const SaveButton=styled.button`
position:relative;min-height:47px;padding:0 21px;border:none;border-radius:9px;background:${COLORS.primary};color:#fff;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer;overflow:hidden;isolation:isolate;transition:color .25s ease,transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:20px;height:20px;border-radius:50%;background:${COLORS.yellow};transform:translate(-50%,-50%) scale(0);transition:transform .55s cubic-bezier(.16,1,.3,1);z-index:-1;pointer-events:none}
&:hover{color:#111;transform:translateY(-2px);box-shadow:0 8px 18px rgba(131,22,20,.2);&::before{transform:translate(-50%,-50%) scale(15)}}
&:active{transform:scale(.97)}
&:focus-visible{outline:2px solid ${COLORS.yellow};outline-offset:2px}
@media(max-width:430px){width:100%}
`;
 
export const CancelButton=styled.button`
position:relative;min-height:47px;padding:0 20px;border:1px solid #cfcfcf;border-radius:9px;background:#fff;color:#555;font-family:inherit;font-size:15px;font-weight:600;cursor:pointer;overflow:hidden;isolation:isolate;transition:color .25s ease,transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:20px;height:20px;border-radius:50%;background:${COLORS.yellow};transform:translate(-50%,-50%) scale(0);transition:transform .55s cubic-bezier(.16,1,.3,1);z-index:-1;pointer-events:none}
&:hover{color:#111;border-color:${COLORS.yellow};transform:translateY(-2px);box-shadow:0 8px 18px rgba(0,0,0,.12);&::before{transform:translate(-50%,-50%) scale(15)}}
&:active{transform:scale(.97)}
&:focus-visible{outline:2px solid ${COLORS.yellow};outline-offset:2px}
@media(max-width:430px){width:100%}
`;
 
/* =====================================================
   CARD DE AVISO
   MESMA INTERFACE DO MODAL "SAIR DA CONTA?" DO PERFIL
===================================================== */
 
const avisoOverlayAppear=keyframes`
from{opacity:0;transform:translateY(12px)}
to{opacity:1;transform:translateY(0)}
`;
 
const avisoModalAppear=keyframes`
from{opacity:0;transform:translateY(25px)}
to{opacity:1;transform:translateY(0)}
`;
 
export const AvisoOverlay=styled.div`
position:fixed;inset:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:25px;box-sizing:border-box;background:rgba(87,17,17,.4);backdrop-filter:blur(7px);z-index:10000;overflow-y:auto;animation:${avisoOverlayAppear} .2s ease both;
`;
 
export const AvisoModal=styled.div`
position:relative;width:500px;max-width:100%;padding:40px;box-sizing:border-box;background:${COLORS.white};border-radius:28px;text-align:center;box-shadow:8px 8px 0 ${COLORS.primary},0 25px 65px rgba(0,0,0,.24);animation:${avisoModalAppear} .25s ease both;overflow:hidden;
&::before{content:"";position:absolute;width:160px;height:160px;top:-85px;right:-65px;border-radius:50%;background:${COLORS.yellow}}
h3{position:relative;margin:20px 0 11px;color:${COLORS.primary};font-size:1.6rem;font-weight:900}
p{position:relative;margin:0 auto 30px;max-width:380px;color:${COLORS.gray};font-size:.95rem;line-height:1.55;word-break:break-word}
p strong{color:#252525;font-weight:800}
@media(max-width:500px){padding:30px 20px;border-radius:22px;h3{font-size:1.35rem}p{font-size:.85rem}}
`;
 
export const AvisoIcon=styled.div`
position:relative;width:70px;height:70px;margin:0 auto;display:flex;align-items:center;justify-content:center;border-radius:50%;background:${COLORS.cream};color:${COLORS.primary};border:2px solid ${COLORS.yellow};
svg{font-size:25px}
`;
 
export const AvisoField=styled.div`
position:relative;margin:-8px 0 26px;display:flex;flex-direction:column;gap:8px;text-align:left;
label{padding-left:4px}
label strong{color:${COLORS.primary}}
input{text-align:left}
`;
 
export const AvisoActions=styled.div`
position:relative;display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%;
@media(max-width:420px){grid-template-columns:1fr}
`;
 
export const AvisoButton=styled.button`
position:relative;width:100%;height:60px;border:0;border-radius:15px;background:${COLORS.primary};color:${COLORS.white};font-family:"Poppins",sans-serif;font-size:.98rem;font-weight:700;cursor:pointer;overflow:hidden;isolation:isolate;transition:transform .25s ease,color .3s ease,box-shadow .3s ease,opacity .2s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:30px;height:30px;border-radius:50%;background:${COLORS.yellow};transform:translate(-50%,-50%) scale(0);z-index:0;pointer-events:none;transition:transform .55s cubic-bezier(.16,1,.3,1)}
.buttonContent{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:9px}
&:hover:not(:disabled){color:#010000;transform:translateY(-2px);box-shadow:0 9px 22px rgba(131,22,20,.2)}
&:hover:not(:disabled)::before{transform:translate(-50%,-50%) scale(10)}
&:active:not(:disabled){transform:scale(.97)}
&:disabled{opacity:.4;cursor:not-allowed}
&:focus-visible{outline:2px solid ${COLORS.yellow};outline-offset:3px}
`;
 
export const AvisoConfirmButton=styled(AvisoButton)``;
 
export const AvisoCancelButton=styled.button`
position:relative;width:100%;height:60px;border:2px solid ${COLORS.yellow};border-radius:15px;background:${COLORS.white};color:#010000;font-family:"Poppins",sans-serif;font-size:.98rem;font-weight:700;cursor:pointer;overflow:hidden;isolation:isolate;transition:transform .25s ease,color .3s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:30px;height:30px;border-radius:50%;background:${COLORS.yellow};transform:translate(-50%,-50%) scale(0);z-index:0;pointer-events:none;transition:transform .55s cubic-bezier(.16,1,.3,1)}
.buttonContent{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:9px}
&:hover{transform:translateY(-2px)}
&:hover::before{transform:translate(-50%,-50%) scale(10)}
&:active{transform:scale(.97)}
&:focus-visible{outline:2px solid ${COLORS.primary};outline-offset:3px}
`;
 
/* =====================================================
   YEARS / BLOCOS
===================================================== */
 
export const YearsWrapper=styled.div`
width:100%;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:18px;box-sizing:border-box;
@media(max-width:900px){gap:12px}
@media(max-width:600px){gap:7px}
@media(max-width:430px){gap:5px}
`;
 
export const YearsContainer=styled.div`
width:100%;max-width:1000px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch;justify-content:center;gap:18px;
@media(max-width:900px){gap:12px}
@media(max-width:700px){gap:9px}
@media(max-width:520px){gap:6px}
`;
 
export const YearArrow=styled.button`
position:relative;width:46px;height:46px;flex-shrink:0;padding:0;display:flex;align-items:center;justify-content:center;border:none;border-radius:12px;background:${COLORS.primary};color:#fff;cursor:pointer;overflow:hidden;isolation:isolate;transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease,opacity .2s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:18px;height:18px;border-radius:50%;background:${COLORS.yellow};transform:translate(-50%,-50%) scale(0);transition:transform .55s cubic-bezier(.16,1,.3,1);z-index:-1;pointer-events:none}
svg{position:relative;z-index:2;width:21px;height:21px;stroke-width:2.5}
&:hover:not(:disabled){color:#111;transform:translateY(-2px);box-shadow:0 8px 18px rgba(131,22,20,.2);&::before{transform:translate(-50%,-50%) scale(8)}}
&:active:not(:disabled){transform:scale(.94)}
&:disabled{opacity:.25;cursor:not-allowed;box-shadow:none}
&:focus-visible{outline:2px solid ${COLORS.yellow};outline-offset:3px}
@media(max-width:700px){width:38px;height:38px;border-radius:10px;svg{width:18px;height:18px}}
@media(max-width:430px){width:32px;height:32px;border-radius:8px;svg{width:16px;height:16px}}
`;
 
export const YearCard=styled.button`
position:relative;width:100%;min-width:0;height:175px;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;box-sizing:border-box;border:2px solid ${({$active})=>$active?COLORS.primary:"#eee"};border-radius:22px;background:${({$active})=>$active?COLORS.primary:"#fff"};color:${({$active})=>$active?"#fff":"#111"};font-family:inherit;cursor:pointer;overflow:hidden;isolation:isolate;transition:transform .3s cubic-bezier(.22,1,.36,1),border-color .25s ease,background .25s ease,box-shadow .3s ease;
&::before{content:"";position:absolute;left:var(--mouse-x,50%);top:var(--mouse-y,50%);width:35px;height:35px;border-radius:50%;background:${COLORS.yellow};transform:translate(-50%,-50%) scale(0);transition:transform .65s cubic-bezier(.16,1,.3,1);z-index:-1;pointer-events:none}
&:hover{transform:translateY(-8px);border-color:${COLORS.primary};box-shadow:0 18px 35px rgba(131,22,20,.16);&::before{transform:translate(-50%,-50%) scale(11)}}
&:active{transform:translateY(-3px) scale(.98)}
&:focus-visible{outline:3px solid ${COLORS.yellow};outline-offset:4px}
@media(max-width:900px){height:155px;padding:17px;border-radius:20px}
@media(max-width:700px){height:135px;padding:13px;border-radius:17px;gap:9px}
@media(max-width:520px){height:115px;padding:10px;border-radius:15px;gap:7px}
@media(max-width:390px){height:105px;padding:8px;border-radius:13px}
`;
 
export const YearIcon=styled.div`
width:52px;height:52px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:50%;background:${({$active})=>$active?COLORS.yellow:"rgba(255,219,83,.22)"};color:${COLORS.primary};font-size:23px;transition:transform .3s ease,background .25s ease;
${YearCard}:hover &{transform:scale(1.12) rotate(2deg)}
@media(max-width:900px){width:46px;height:46px;font-size:21px}
@media(max-width:700px){width:40px;height:40px;font-size:18px}
@media(max-width:520px){width:34px;height:34px;font-size:15px}
@media(max-width:390px){width:30px;height:30px;font-size:13px}
`;
 
export const YearNumber=styled.strong`
position:relative;z-index:2;color:${({$active})=>$active?"#fff":COLORS.primary};font-size:2.1rem;font-weight:850;line-height:1;transition:color .25s ease,transform .3s ease;
${YearCard}:hover &{color:#111;transform:scale(1.05)}
@media(max-width:900px){font-size:1.8rem}
@media(max-width:700px){font-size:1.55rem}
@media(max-width:520px){font-size:1.3rem}
@media(max-width:390px){font-size:1.15rem}
`;
 
export const YearDescription=styled.span`
position:relative;z-index:2;color:${({$active})=>$active?"rgba(255,255,255,.72)":"#999"};font-size:10px;font-weight:500;line-height:1.2;text-align:center;white-space:nowrap;transition:color .25s ease;
${YearCard}:hover &{color:#5e4900}
@media(max-width:600px){font-size:9px;white-space:normal}
@media(max-width:520px){font-size:8px}
`;
 
export const Bloco=styled.section`
width:100%;margin-bottom:28px;padding:28px 30px 32px;box-sizing:border-box;background:#fff;border:2px solid #d2d2d2;border-radius:20px;box-shadow:0 18px 45px rgba(0,0,0,.10),0 3px 8px rgba(0,0,0,.045);
@media(max-width:900px){padding:24px 21px 28px}
@media(max-width:600px){margin-bottom:20px;padding:19px 14px 22px;border-radius:16px}
`;
 
export const BlocoHeader=styled.div`
margin-bottom:25px;padding-bottom:19px;display:flex;align-items:center;gap:15px;border-bottom:2px solid #ddd;
@media(max-width:600px){margin-bottom:19px;padding-bottom:14px;gap:11px}
`;
 
export const BlocoIcone=styled.div`
width:46px;height:46px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#fff5c9;border:1px solid #e5ce73;color:${COLORS.primary};font-size:21px;
@media(max-width:600px){width:38px;height:38px;font-size:17px}
`;
 
export const BlocoInfo=styled.div`
min-width:0;display:flex;flex-direction:column;gap:4px;
`;
 
export const BlocoTitulo=styled.h2`
margin:0;color:#252525;font-size:24px;font-weight:750;
@media(max-width:600px){font-size:19px}
`;
 
export const BlocoDescricao=styled.p`
margin:0;color:#777;font-size:16px;line-height:1.45;
@media(max-width:600px){font-size:13px}
`;
 
