interface AvatarProps {
    src: string;
    name: string;
}

export default function Avatar({ src, name }: AvatarProps) {
    return(
        <div className="avatar" style={{ alignItems: 'center', columnGap: '0.5rem' }}>
            <img
                className="avatar__photo"
                style={{ height: '1rem', width: '1rem' }}
                src={src} />
            <div className="avatar__intro">
                <div className="avatar__name">{name}</div>
            </div>
        </div>
    )
}