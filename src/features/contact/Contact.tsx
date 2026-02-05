export default function Contact() {
	return (
		<main className="mx-auto max-w-2xl p-8">
			<h2 className="text-2xl font-semibold text-brand.primary">Contacto</h2>
			<p className="mt-2">
				Si te interesa colaborar en remoto, escríbeme a{" "}
				<a
					className="text-brand.accent underline"
					href="mailto:zerocode.devops@gmail.com"
				>
					zerocode.devops@gmail.com
				</a>{" "}
				o conecta por LinkedIn.
			</p>
			<div className="mt-6 flex gap-3">
				<a
					className="btn btn-primary"
					href="https://jbarrancolimpieza.com"
					target="_blank"
					rel="noopener"
				>
					Ver proyecto
				</a>
				<a
					className="btn btn-accent"
					href="https://instagram.com/zerocode_devops"
					target="_blank"
					rel="noopener"
				>
					@zerocode_devops
				</a>
			</div>
		</main>
	);
}
