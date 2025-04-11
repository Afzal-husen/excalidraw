const CanvasPage = async ({
  params,
}: {
  params: Promise<{ roomid: string }>;
}) => {
  const roomId = (await params).roomid;
  return <div>roomId: {roomId}</div>;
};

export default CanvasPage;
