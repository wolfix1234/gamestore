import VideoPlayer from "@/components/VideoPlayer";

export default function VideoPage() {
  return (
    <div className="container mx-auto p-8">
      {/* Video at top */}
      <VideoPlayer src="https://tomak.arvanvod.ir/2bPqz8Rxv9/n4ZwZKrQPO/origin_GpSxvwwhd1DqDsZGeB2Xqq6tgHjiVhZGQdCCHCuJ.mp4" />
      
      <div className="my-8">
        <h2>Some content here</h2>
      </div>
      
      {/* Video in middle */}
      <VideoPlayer src="https://tomak.arvanvod.ir/2bPqz8Rxv9/n4ZwZKrQPO/origin_GpSxvwwhd1DqDsZGeB2Xqq6tgHjiVhZGQdCCHCuJ.mp4" />
      
      <div className="my-8">
        <h2>More content</h2>
      </div>
      
      {/* Video at bottom */}
      <VideoPlayer src="https://tomak.arvanvod.ir/2bPqz8Rxv9/n4ZwZKrQPO/origin_GpSxvwwhd1DqDsZGeB2Xqq6tgHjiVhZGQdCCHCuJ.mp4" />
    </div>
  );
}