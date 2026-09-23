Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\ferna\.gemini\antigravity-ide\brain\985171f4-e4a8-4c09-af7c-b3c63c674acd\.user_uploaded\media_1789217062793.png"
$outputPathDark = Join-Path (Get-Location) "public\exo-logo-full-darkbg.png"
$outputPathOrig = Join-Path (Get-Location) "public\exo-logo-full-transparent.png"

$img = [System.Drawing.Bitmap]::FromFile($inputPath)
$w = $img.Width
$h = $img.Height

$imgDark = New-Object System.Drawing.Bitmap($w, $h)
$imgOrig = New-Object System.Drawing.Bitmap($w, $h)

for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $h; $y++) {
        $p = $img.GetPixel($x, $y)
        # Background check (near white)
        if ($p.R -gt 235 -and $p.G -gt 235 -and $p.B -gt 235) {
            $imgDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
            $imgOrig.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            # Original pixel for orig
            $imgOrig.SetPixel($x, $y, $p)

            # Check if this pixel belongs to the dark blue text on the right (x > 38% width and R < 100, G < 120)
            if ($x -gt ($w * 0.38) -and $p.R -lt 120 -and $p.G -lt 130) {
                # Convert dark text to crisp white for dark background readability
                $alpha = $p.A
                $imgDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
            } else {
                # 3D Emblem pixels remain untouched
                $imgDark.SetPixel($x, $y, $p)
            }
        }
    }
}

$imgDark.Save($outputPathDark, [System.Drawing.Imaging.ImageFormat]::Png)
$imgOrig.Save($outputPathOrig, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$imgDark.Dispose()
$imgOrig.Dispose()

Write-Output "Full logo processed successfully!"
