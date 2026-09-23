Add-Type -AssemblyName System.Drawing
$filePath = Join-Path (Get-Location) "public\exo-logo-official.png"
$outputPath = Join-Path (Get-Location) "public\exo-logo-transparent.png"

$img = [System.Drawing.Bitmap]::FromFile($filePath)
$width = $img.Width
$height = $img.Height

for ($x = 0; $x -lt $width; $x++) {
    for ($y = 0; $y -lt $height; $y++) {
        $p = $img.GetPixel($x, $y)
        if ($p.R -gt 230 -and $p.G -gt 230 -and $p.B -gt 230) {
            $img.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
    }
}

$img.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Output "Transparent logo successfully generated at public/exo-logo-transparent.png"
