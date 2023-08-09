type FormHeaderProps = {
  title: string;
  subtitle: string;
};

export default function FormHeader({
  title,
  subtitle
}: FormHeaderProps) {
  
  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-screen-lg text-center">
        <h2 className="leading-tight text-4xl">
          {title}
        </h2>
        {subtitle && 
          <p className="mx-auto mt-6 max-w-[820px] text-lg leading-8">
            {subtitle}
          </p>
        }
      </div>
    </div>
  );
}