package config

import (
	"fmt"

	"github.com/darkhelmet/env"
)

var (
	Port          = env.IntDefault("PORT", 9000)
	CanonicalHost = env.StringDefaultF("CANONICAL_HOST", func() string { return fmt.Sprintf("localhost:%d", Port) })
	AssetHost     = env.StringDefaultF("ASSET_HOST", func() string { return fmt.Sprintf("http://%s", CanonicalHost) })
)
