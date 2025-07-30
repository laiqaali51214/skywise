import videoBg from "../assets/video1.mp4";

export default function Background() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
            <video
                src={videoBg}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            />
        </div>
    );
}
