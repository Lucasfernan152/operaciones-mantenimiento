import { Skeleton } from "@mui/material"


export const LoaderTable = () => {
  return (
    <div>SkeletonLoaders</div>
  )
}



export const LoaderTaskMobile = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-4 px-4">
        <Skeleton variant="rounded" className="w-[94%]" sx={{ backgroundColor:'#f1f1f1a0', borderRadius:'20px', }}  height={160} />
        <Skeleton variant="rounded" className="w-[94%]" sx={{ backgroundColor:'#f1f1f1a0', borderRadius:'20px', }} height={160} />
        <Skeleton variant="rounded" className="w-[94%]" sx={{ backgroundColor:'#f1f1f1a0', borderRadius:'20px', }} height={160} />
        <Skeleton variant="rounded" className="w-[94%]" sx={{ backgroundColor:'#f1f1f1a0', borderRadius:'20px', }} height={160} />
       
    </div>
  )
}
