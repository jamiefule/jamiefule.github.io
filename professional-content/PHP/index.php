<html>
	<head>
		<!-- Font Awesome -->
		<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
		<!-- Google Fonts -->
		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>
		<!-- MDB -->
		<link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.css" rel="stylesheet" />
		<link href=https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"/>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<!-- MDB JS -->
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.js"></script>

		<!-- my files -->
		<script type="text/javascript" src="./scripts/setup.js"></script>
		<link rel="stylesheet" href="./scripts/style.css"/>
	</head>

	<body>
		<div id="banner">
			<h1>Weather</h1>
		</div>
		<div class="content">
			<table id="weather-container">
				<tr>
					<td class="card-container" id="wind-container">
						<div class="card" id="wind-card">
							<h3>Wind</h3>
						</div>
					</td>
					<td class="card-container" id="humidity-container">
						<div class="card" id="humidity-card">
							<h3>Humidity</h3>
						</div>
					</td>
				</tr>
				<tr id="forecast-row">
					<td colspan=2 class="card-container" id="forecast-container">
						<div class="card" id="forecast-card">
							<h3>Forecast</h3>
						</div>
					</td>
				</tr>
			</table>	
		</div>
		<img id="bgBlobBlue" src="./assets/blue-blob.svg"/>
		<img id="bgBlobPink" src="./assets/pink-blob.svg"/>
	</body>
</html>