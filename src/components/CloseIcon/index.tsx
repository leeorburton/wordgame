import Image from "next/image";

function CloseIcon() {
    return <Image
        src={require('../../../public/close.svg')}
        width={24}
        height={24}
        alt="Close Icon"
    />;
}

export default CloseIcon;